import { Injectable } from '@angular/core';
import config from '../../config/config';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(private http: HttpClient) {}

  async getTrips() {
    return this.http.get<ResponseGetTrips[]>(`${config.API_URL}/trips`);
  }

  async searchTrips(query: string) {
    return this.http.get<ResponseGetTrips[]>(`${config.API_URL}/trips/search?q=${query}`);
  }

}
