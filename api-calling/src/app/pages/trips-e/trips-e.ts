import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { APIService } from '../../services/apiservice';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTrip } from '../trips-d/trips-d';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trips-e',
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './trips-e.html',
  styleUrls: ['./trips-e.scss']
})
export class TripsE {
  tripId: string | null = null;
  trip: ResponseDTrip | null = null;
  loading: boolean = true;

  locationData = {
    name: '',
    detail: '',
    price: 0,
    country: '',
    continent: '',
    duration: 0,
    coverimage: ''
  };

  countries = ['สวิตเซอร์แลนด์', 'สิงคโปร์', 'เวียดนาม', 'ลาว', 'ไอซ์แลนด์', 'เยอรมันนี', 'ญี่ปุ่น', 'มัลดีฟส์', 'อินเดีย', 'มาเลเซีย', 'ฝรั่งเศส', 'เกาหลี', 'ประเทศไทย'];
  continents = ["เอเชีย", "ยุโรป", "เอเชียตะวันออกเฉียงใต้", "ประเทศไทย"];

  constructor(private APIService: APIService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      this.getTrip();
    });
  }

  async getTrip() {
    if (!this.tripId) {
      console.error('tripId is null');
      this.loading = false;
      return;
    }

    try {
      this.loading = true;
      const id = Number(this.tripId);
      const response = await this.APIService.getTripsD(id);
      this.trip = await lastValueFrom(response) as ResponseDTrip;
      console.log(this.trip);

      // กรอกข้อมูลลง form
      this.locationData.name = this.trip.name || '';
      this.locationData.detail = this.trip.detail || '';
      this.locationData.price = this.trip.price || 0;
      this.locationData.country = this.trip.country || '';
      this.locationData.continent = this.trip.destination_zone || '';
      this.locationData.duration = this.trip.duration || 0;
      this.locationData.coverimage = this.trip.coverimage || '';
    } catch (error) {
      console.error('Error fetching trip details:', error);
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (!this.tripId) return;

    try {
      const response = await this.APIService.editTrip(Number(this.tripId), this.locationData);
      const res = await lastValueFrom(response);
      console.log('Trip updated:', res);
      alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      this.router.navigateByUrl('/');
    } catch (err) {
      console.error('Error updating trip', err);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  }
}
