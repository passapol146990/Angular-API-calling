import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-call-api',
  imports: [ HttpClientModule ],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi {
  constructor(private http: HttpClient) { 
    fetch("https://mobile-msu-api.onrender.com/trip").then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    });
  }

  callApi() {
    const url = 'http://localhost:3000/trip';
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
    });

    console.log('Call Completed');
  }
}
