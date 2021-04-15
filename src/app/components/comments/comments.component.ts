import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'comments-root',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

    private commentSubs = new Subscription();
    public currentComment = '';
    private clientID;

    public comments = [];

    constructor(private commentsService: CommentsService) {}

    ngOnInit(): void {
        // first grab initial comments
        this.getComments();
        // generate unique client id for comment posting
        this.clientID = this.generateRandomNumber();
        // listen for updates in comments from server
        this.commentSubs.add(this.commentsService.newCommentEvent.subscribe(res => {
            this.getComments();
        }));
    }

    // generates are random number
    public generateRandomNumber() {
        const numberA = new Uint32Array(1);
        const numberB = new Uint16Array(1);
        window.crypto.getRandomValues(numberA);
        window.crypto.getRandomValues(numberB);
        return numberA[0] + '-' + numberB[0];
    }

    public getComments() {
        this.commentSubs.add(this.commentsService.getComments().subscribe((data: []) => {
            if (data) {
                this.comments = data;
            }
        }));
    }

    public postComment() {
        if (this.currentComment) {
            const comment = {
                id: this.generateRandomNumber(),
                clientId: this.clientID,
                comment: this.currentComment,
                timeStamp: new Date(),
                flag: 'N'
            };
            this.commentSubs.add(this.commentsService.postComment(comment).subscribe(_ => {
                this.currentComment = '';
            }));
        }
    }

    public flagComment(index) {
        if (this.comments[index]) {
            const currentComment = this.comments[index];
            const newFlag = currentComment.flag === 'Y' ? 'N' : 'Y';
            const options = {
                flag: newFlag
            };

            this.commentSubs.add(this.commentsService.flagComment(currentComment.id, options).subscribe());
        }
    }

    public deleteComment(index) {
        if (this.comments[index]) {
            const currentComment = this.comments[index];
            this.commentSubs.add(this.commentsService.deleteComment(currentComment.id).subscribe());
        }
    }

    ngOnDestroy(): void {
        // unsubscribe from all streams
        this.commentSubs.unsubscribe();
    }
}
