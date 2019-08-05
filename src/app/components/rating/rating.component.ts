import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input()
  rate = 0;
  @Input()
  readonly = false;
  @Output()
  rateChange = new EventEmitter();
  initialRating;
  stars = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit() {
    this.initialRating = this.rate;
  }

  plusRate(value) {
    if (!this.readonly) {
      this.rate = value;
    }
  }

  setInitial() {
    if (!this.readonly) {
      this.rate = this.initialRating;
    }
  }

  setRate(value) {
    if (!this.readonly) {
      this.rate = value;
      this.initialRating = value;
      this.rateChange.emit(this.rate);
    }
  }

}
