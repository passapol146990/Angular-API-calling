import { Component, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { APIService } from '../../services/apiservice';
import { lastValueFrom, timeout } from 'rxjs';

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


  constructor(private route: Router,private APIService:APIService) { }

  sliceText(text:string,len:number){
    if (text.length > len) {
      return text.slice(0, len) + '...';
    }
    return text;
  }

  async useTrips() {
    this.route.navigateByUrl(`get/trip/${this.idx}`);
  }

  async deleteTrip() {
    Swal.fire({
      title: "คุณต้องการลบ?",
      text: `คุณต้องการลบ "${this.name}" ใช่หรือไม่`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "rgba(45, 67, 227, 1)",
      confirmButtonText: "ใช่ ลบเลย"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        const response = await this.APIService.deleteTrip(this.idx);
        const res = await lastValueFrom(response);
        console.log(res);
        setTimeout(()=>{
          window.location.reload();
        },1500)
      }
    });
  }
}
