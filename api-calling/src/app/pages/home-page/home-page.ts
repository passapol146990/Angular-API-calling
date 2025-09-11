import { Component } from '@angular/core';
import { APIService } from '../../services/apiservice';
import { lastValueFrom } from 'rxjs';
import { Navbar } from "../../components/navbar/navbar";
import { CardTrip } from "../../components/card-trip/card-trip";
import { FormsModule } from '@angular/forms'; // เพิ่มเพื่อใช้ [(ngModel)]

interface TypeResponseTrips{
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
  selector: 'app-home-page',
  imports: [Navbar, CardTrip, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  trips: TypeResponseTrips[] = [];
  filteredTrips: TypeResponseTrips[] = [];
  countries: string[] = [];

  searchId: string = '';
  searchName: string = '';
  searchCountry: string = '';

  constructor(private APIservice: APIService) {
    this.getTrips();
  }

  async getTrips() {
    const response = await this.APIservice.getTrips();
    this.trips = await lastValueFrom(response);
    this.filteredTrips = this.trips; 
    this.countries = [...new Set(this.trips.map(e => e.destination_zone))];
  }

  filterTrips() {
    this.filteredTrips = this.trips.filter(t => {
      const matchId = this.searchId ? t.idx.toString().includes(this.searchId) : true;
      const matchName = this.searchName ? t.name.toLowerCase().includes(this.searchName.toLowerCase()) : true;
      const matchCountry = this.searchCountry ? t.destination_zone === this.searchCountry : true;
      return matchId && matchName && matchCountry;
    });
  }
}
