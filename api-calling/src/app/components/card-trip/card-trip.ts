import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-card-trip',
  imports: [],
  templateUrl: './card-trip.html',
  styleUrl: './card-trip.scss'
})
export class CardTrip {
  @Input() idx!: number;
  @Input() name!: string;
  @Input() country!: string;
  @Input() coverimage!: string;
  @Input() detail!: string;
  @Input() price!: number;
  @Input() duration!: string;
  @Input() destination_zone!: string;

  getDescription() {
    if (typeof this.detail === 'string' && this.detail.length > 20) {
      return this.detail.slice(0, 40) + '...';
    }
    return this.detail;
  }

  useTrips(){
    console.log(this.idx);
  }
}
