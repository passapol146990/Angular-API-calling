import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../services/apiservice';
import { lastValueFrom } from 'rxjs';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-trips-c',
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: './trips-c.html',
  styleUrls: ['./trips-c.scss']
})
export class TripsC {
  locationData = {
    name: '',
    detail: '',
    price: 0,
    country: '',
    continent: '',
    duration: 0,
    coverimage: ''
  };

  countries = ['สวิตเซอร์แลนด์', 'สิงคโปร์', 'เวียดนาม', 'ลาว', 'ไอซ์แลนด์',"เยอรมันนี",'ญี่ปุ่น','มัลดีฟส์','อินเดีย','มาเลเซีย','ฝรั่งเศส','เกาหลี','ประเทศไทย'];
  continents = ["เอเชีย","ยุโรป","เอเชียตะวันออกเฉียงใต้","ประเทศไทย"];

  constructor(private router: Router, private APIService: APIService) { }

  async onSubmit() {
    try {
      const response = await this.APIService.createTrip(this.locationData);
      const res = await lastValueFrom(response);
      console.log('Trip created:', res);
      alert('บันทึกข้อมูลเรียบร้อย');
      this.router.navigateByUrl('/');
    } catch (err) {
      console.error('Error creating trip', err);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    }
  }
}
