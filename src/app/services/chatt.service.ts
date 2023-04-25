import { HttpParams,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, LiveStreamingTranscodingConfig, ICameraVideoTrack, IMicrophoneAudioTrack, ScreenVideoTrackInitConfig, VideoEncoderConfiguration, AREAS, IRemoteAudioTrack, ClientRole } from "agora-rtc-sdk-ng"
import { BehaviorSubject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChattService {
  //  client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
  //  localAudioTrack = null;
  dataVedio:any
  constructor(private http: HttpClient){}

  rtc: IRtc = {
    client:null!,
    localAudioTrack: null!,
    localVideoTrack: null!,
  };

  options = {
    // appId: "",  // set your appid here
    // channel: "test", // Set the channel name.
    // token: '', // Pass a token if your project enables the App Certificate.
    uid: null,
    token: "007eJxTYHjKcy/GbQ1Pi9v6khfr3RfODOR+XvJuftqKST8qLTfc4tFXYDAzT0u1TLZISjYwNTQxtzC1NDA0MTC0SDY3MjFOtjA1EVZ3TBHgY2Ao/ZvOwAiELECsbOqYwgQmmcEkC5TMAAIGBgB0kSEd",
    channel: "hhhh",
     appId :'67fe9c8bc05147859014018c7243c854'
  };

  remoteUsers: IUser[] = []      // To add remote users in list
  updateUserInfo = new BehaviorSubject<any>(null); // to update remote users name

  // constructor(public api: ApiService) { }

  createRTCClient() {
    this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
  }

  async localUser(token:any, uuid:any) {
    this.dataVedio = this.http.post('https://valucleaning.erp-everest.com/api/generate-token', {
      channelName: 'hhhh',
      token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3ZhbHVjbGVhbmluZy5lcnAtZXZlcmVzdC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNjgxNjMyNDQ0LCJuYmYiOjE2ODE2MzI0NDQsImp0aSI6IlRrem5kNlNDVmhySWpsV1MiLCJzdWIiOiIxOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Yt-N1BMp2sfPSp1WSAb8X3ftNbXuLfmxDLJmDfonwcI"

    })
    .subscribe(
      (responseData) => {
        // This is where you can access the data returned from the subscription.
        this.dataVedio = responseData;
        console.log('***',this.dataVedio.data.token);
        console.log('***',this.dataVedio.data.channel);
        this.options.channel=this.dataVedio.data.channel
        this.options.token=this.dataVedio.data.token

        // const uid = await this.rtc.client.join(this.options.appId, this.options.channel,
        //   this.options.token||null , uuid);
        // this.oldMessages = this.data.data;
      },
      (error) => {
        console.error(error);
      }
    );

    // const uid = await this.rtc.client.join(this.options.appId, this.options.channel,
    //   this.options.token||null , uuid);
    // Create an audio track from the audio sampled by a microphone.
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: "120p",
    });

      // Publish the local audio and video tracks to the channel.
      this.rtc.localVideoTrack.play("local-player");
      // channel for other users to subscribe to it.
      await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);

}

agoraServerEvents(rtc:any) {

  rtc.client.on("user-published", async (user:any, mediaType:any) => {
    console.log(user, mediaType, 'user-published');

    await rtc.client.subscribe(user, mediaType);
    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack;
      console.log(user.uid)
      remoteVideoTrack.play('remote-playerlist' + user.id);
    }
    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();
    }
    navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    console.log('Camera access granted.');
  })
  .catch(error => {
    console.log('Camera access denied.', error);
  });
  });
  rtc.client.on("user-unpublished", (user:any)=> {
    console.log(user, 'user-unpublished');
  });


  rtc.client.on("user-joined", (user:any) => {
    console.log(user.id)
    let id = user.id;
    this.remoteUsers.push({ 'uid': +id });
    this.updateUserInfo.next(id);
    console.log("user-joined", user, this.remoteUsers, 'event1');
  });
}

 // To leave channel-
 async leaveCall() {
  // Destroy the local audio and video tracks.
  this.rtc.localAudioTrack.close();
  this.rtc.localVideoTrack.close();
  // Traverse all remote users.
  this.rtc.client.remoteUsers.forEach(user => {
    // Destroy the dynamically created DIV container.
    const playerContainer = document.getElementById('remote-playerlist' + user.uid.toString());
    playerContainer && playerContainer.remove();
  });
  // Leave the channel.
  await this.rtc.client.leave();

}

// rtc token
async generateTokenAndUid(uid:any) {

  // let url = 'https://test-agora.herokuapp.com/access_token?&#39';
  // const opts = { params: new HttpParams({ fromString: "channel=test&uid=" + uid }) };
  // const data = await this.api.getRequest(url, opts.params).toPromise();
  // return { 'uid': uid, token: data['token'] }
  return {'uid':uid,token:this.options.token}

}

generateUid() {
  const length = 5;
  const randomNo = (Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)));
  return randomNo;
}



}


export interface IUser {
uid: number;
name?: string;
}
export interface IRtc {
client: IAgoraRTCClient,
localAudioTrack: IMicrophoneAudioTrack,
localVideoTrack: ICameraVideoTrack
}


