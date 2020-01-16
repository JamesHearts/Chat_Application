import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class CommentHttpService {

    // fromEvent returns and Observable
    public newCommentEvent = this.socket.fromEvent<any>('comment');

    constructor(private http: HttpClient, private socket: Socket) { }

    // http get request to retreive comments
    getComments() {
        const URL = 'http://localhost:3000/comments';

        return this.http.get(URL);
    }

    // http post request to add comments
    postComment(comment) {
        const URL = 'http://localhost:3000/comments';

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(URL, comment, httpOptions).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
    }

    // toggles the "flag" property on a comment, uses ID
    flagComment(id, options) {
        const URL = 'http://localhost:3000/comments/' + id;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.put(URL, options, httpOptions);
    }

    // deletes comment, uses ID
    deleteComment(id) {
        const URL = 'http://localhost:3000/comments/' + id;
        return this.http.delete(URL);
    }
}
