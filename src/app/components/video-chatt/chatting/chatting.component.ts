import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChattService } from 'src/app/services/chatt.service';
import { HttpClient } from '@angular/common/http';

// import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc'; // Add
// import { AppComponent } from './app.component';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {

  dataVedio:any
  constructor(private http: HttpClient,public stream:ChattService) {}
  ngOnInit(): void {
  }

  hideBtns = true;

  async startCall() {
    // this.dataVedio = this.http.post('https://valucleaning.erp-everest.com/api/generate-token', {
    //   channelName: 'hhhh',
    //   token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3ZhbHVjbGVhbmluZy5lcnAtZXZlcmVzdC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjgxNjMyNDQ0LCJuYmYiOjE2ODE2MzI0NDQsImp0aSI6IlRrem5kNlNDVmhySWpsV1MiLCJzdWIiOiIxOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Yt-N1BMp2sfPSp1WSAb8X3ftNbXuLfmxDLJmDfonwcI"

    // })
    // .subscribe(
    //   (responseData) => {
    //     // This is where you can access the data returned from the subscription.
    //     this.dataVedio = responseData;
    //     console.log('***',this.dataVedio.data.token);
    //     console.log('***',this.dataVedio.data.channel);
    //     this.stream.options.channel=this.dataVedio.data.channel
    //     this.stream.options.token=this.dataVedio.data.token


    //     // this.oldMessages = this.data.data;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

       const uid = this.stream.generateUid();
       const rtcDetails = await this.stream.generateTokenAndUid(uid);
       this.stream.createRTCClient();
       this.stream.agoraServerEvents(this.stream.rtc);
       await this.stream.localUser(rtcDetails.token, uid);

       this.hideBtns = false;
   }

   async logout() {
     await this.stream.leaveCall();
   }

}
