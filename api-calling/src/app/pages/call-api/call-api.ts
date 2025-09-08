import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import config from '../../../config/config';
import { APIService } from '../../services/apiservice';

interface ResponseGetTrips {
  idx: number,
  name: string,
  country: string,
  coverimage: string,
  detail: string,
  price: number,
  duration: number,
  destination_zone: string
}

@Component({
  selector: 'app-call-api',
  imports: [HttpClientModule],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})

export class CallApi {

  trips: ResponseGetTrips[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private APIService: APIService) {
    console.log(config.API_URL);
  }

  async callApi() {
    try {
      const trips = await this.APIService.getTrips();
      // this.trips = trips;
      console.log('Trips from API:', trips);
    } catch (error) {
      console.error('API error:', error);
    }
  }

  async GetTripsSearch() {
    try {
      this.http.get<any[]>(`${config.API_URL}/trips/search?q=${this.searchTerm}`)
      .subscribe({
        next: (res) => {
          this.trips = res;
          console.log('Trips from API:', res);
        },
        error: (err) => {
          console.error('API error:', err);
        }
      });
    } catch (error) {
      console.error('API error:', error);
    }
  }
}
