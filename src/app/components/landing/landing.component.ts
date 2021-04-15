import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  currentTime;
  backgroundStyle;
  fontColor;
  greeting;

  constructor() { }

  ngOnInit() {
    this.getTime();

    setInterval(() => {
      this.getTime();
    }, 1000);
  }

  getTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    this.setBackground(hour);

    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    this.currentTime = `${hour}:${this.addZero(min)}:${this.addZero(sec)}`;

  }

  addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  setBackground(hour) {
    console.log(hour);
    if (hour < 12){
      if (hour > 5) {
        this.backgroundStyle = `url('assets/images/morning.jpeg')`;
        this.fontColor = 'black';
      } else {
        this.backgroundStyle = `url('assets/images/night.jpeg')`;
        this.fontColor = 'white';
      }
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      this.backgroundStyle = `url('assets/images/afternoon.jpeg')`;
      this.fontColor = 'black';
      this.greeting = 'Good Afternoon';
    } else {
      this.backgroundStyle = `url('assets/images/night.jpeg')`;
      this.fontColor = 'white';
      this.greeting = 'Good Evening';
    }
  }

}
