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

  async getTripsD(id:number){
    return this.http.get(`${config.API_URL}/trips/${id}`)
  }

  async createTrip(tripData: any) {
    return this.http.post(`${config.API_URL}/trips`, tripData);
  }

  async deleteTrip(id : number){
    return this.http.delete(`${config.API_URL}/trips/${id}`);
  }

  async editTrip(id:number,data:any){
    // name, country, destinationid, coverimage, detail, price, duration
    return this.http.put(`${config.API_URL}/trips/${id}`,data);
  }

}
