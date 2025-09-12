import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/apiservice';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trips-d',
  imports: [Navbar, CommonModule],
  templateUrl: './trips-d.html',
  styleUrl: './trips-d.scss'
})
export class TripsD implements OnInit{
  tripId: string | null = null;
  trip: ResponseDTrip | null = null;
  loading: boolean = true;

  constructor(private APIService:APIService, private route:ActivatedRoute,private router:Router){}  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      console.log(this.tripId);
      this.getTrip();
    });
  }

  async getTrip(){
    if (this.tripId !== null) {
      try {
        this.loading = true;
        const id = Number(this.tripId);
        const response = await this.APIService.getTripsD(id);
        this.trip = await lastValueFrom(response) as ResponseDTrip;
        console.log(this.trip);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      } finally {
        this.loading = false;
      }
    } else {
      console.error('tripId is null');
      this.loading = false;
    }
  }

  editTrip(){
    this.router.navigateByUrl(`/edit/trip/${this.tripId}`);
  }
}

export interface ResponseDTrip {
  continent: string;
  country:string,
  coverimage:string,
  destination_zone:string,
  detail:string,
  duration:number,
  idx:number,
  name:string,
  price:number
}