import { Component } from '@angular/core';
import { APIService } from '../../services/apiservice';
import { lastValueFrom } from 'rxjs';
import { Navbar } from "../../components/navbar/navbar";
import { CardTrip } from "../../components/card-trip/card-trip";

@Component({
  selector: 'app-home-page',
  imports: [Navbar, CardTrip],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  trips: any[] = [];
  constructor(private APIservice:APIService){
    this.getTrips();
  }

  async getTrips() {
    const response = await this.APIservice.getTrips();
    this.trips = await lastValueFrom(response);
    console.log(this.trips);
  }
}
