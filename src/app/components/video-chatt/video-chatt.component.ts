import { Component, OnDestroy, OnInit } from '@angular/core';
// import AgoraRTC from 'agora-rtc-sdk';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import AgoraRTC from 'agora-rtc-sdk';
import * as AgoraRTC   from 'agora-rtc-sdk';
// import { Client } from 'agora-rtc-sdk-ng';


@Component({
  selector: 'app-video-chatt',
  templateUrl: './video-chatt.component.html',
  styleUrls: ['./video-chatt.component.css']
})
export class VideoChattComponent implements OnInit,OnDestroy {
  client: any;
  localStream: any;

  constructor() {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // joinCall() {
  //   // Initialize AgoraRTC client
  //   this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

  //   // Join a channel on the Agora client
  //   const uid = Math.floor(Math.random() * 1000000);  // Set a random user ID for testing purposes
  //   const channelName = 'value-clean7';  // Replace with your
  //   const token = '00667fe9c8bc05147859014018c7243c854IAAPdh07odGicDMaWMfPzZNJSDNgj1RAiU81TtccUsKlAS27CI6CSr9qEAB9swAASHo4ZAEAAQDYNjdk'
  //   const appId ='67fe9c8bc05147859014018c7243c854';
  //   // this.apiService.generateToken(uid.toString(), channelName).subscribe((response:any) => {
  //   // this.apiService.generateToken(uid.toString(), channelName).subscribe((response:any) => {
  //     console.log('this.client:', this.client);
  //     this.client.join(appId,token, channelName||null).then(() => {
  //         // Create a local stream to display on the call interface
  //         this.localStream = AgoraRTC.createStream({
  //           audio: true,
  //           video: true,
  //           screen: false
  //         });
  //         // Publish the local stream to the channel
  //         this.client.publish(this.localStream);
  //         // Display

  //       }).catch((err:any) => {
  //         console.error('Failed to join channel', err);
  //       });
  //     // });
    
  //     // Listen for remote stream added event
  //   this.client.on('user-published', async (user:any, mediaStream:any) => {
  //     // Subscribe to the remote stream
  //     await this.client.subscribe(mediaStream);
  //     // Display the remote stream on the call interface
  //     const remoteStreamDiv = document.createElement('div');
  //     remoteStreamDiv.id = `remote-stream-${mediaStream.getId()}`;
  //     remoteStreamDiv.classList.add('remote-stream');
  //     document.querySelector('#remote-streams')!.appendChild(remoteStreamDiv);
  //     mediaStream.play(`remote-stream-${mediaStream.getId()}`);});
  //   }

  // joinCall() {
  //   // Initialize AgoraRTC client
  //   this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });

  //   // Join a channel on the Agora client
  //   const uid = Math.floor(Math.random() * 1000000);
  //   const channelName = 'value-clean7';
  //    const token = '00667fe9c8bc05147859014018c7243c854IAAPdh07odGicDMaWMfPzZNJSDNgj1RAiU81TtccUsKlAS27CI6CSr9qEAB9swAASHo4ZAEAAQDYNjdk'
  //   const appId ='67fe9c8bc05147859014018c7243c854';

  //   console.log('this.client:', this.client);
  //   this.client.join(appId,token, channelName||null).then(() => {
  //     // Create a local stream to display on the call interface
  //     this.localStream = AgoraRTC.createStream({
  //       audio: true,
  //       video: true,
  //       screen: false
  //     });
  //     // Publish the local stream to the channel
  //     this.client.publish(this.localStream);
  //     // Display

  //   }).catch((err:any) => {
  //     console.error('Failed to join channel', err);
  //   });

  //   // Listen for remote stream added event
  //   this.client.on('user-published', async (user:any, mediaStream:any) => {
  //     // Subscribe to the remote stream
  //     await this.client.subscribe(mediaStream);
  //     // Display the remote stream on the call interface
  //     const remoteStreamDiv = document.createElement('div');
  //     remoteStreamDiv.id = `remote-stream-${mediaStream.getId()}`;
  //     remoteStreamDiv.classList.add('remote-stream');
  //     document.querySelector('#remote-streams')!.appendChild(remoteStreamDiv);
  //     mediaStream.play(`remote-stream-${mediaStream.getId()}`);
  //   });
  // }
  
    // client: any;
    // localStream: any;
  
    joinCall(remoteUserId: any) {
      // Initialize AgoraRTC client
      this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
  
      // Join a channel on the Agora client
      const uid = Math.floor(Math.random() * 1000000);
      const channelName = 'value-clean7';
      const token = '00667fe9c8bc05147859014018c7243c854IAAPdh07odGicDMaWMfPzZNJSDNgj1RAiU81TtccUsKlAS27CI6CSr9qEAB9swAASHo4ZAEAAQDYNjdk'
      const appId ='67fe9c8bc05147859014018c7243c854';
  
      console.log('this.client:', this.client);
      this.client.join(appId,token, channelName||null).then(() => {
        // Create a local stream to display on the call interface
        this.localStream = AgoraRTC.createStream({
          audio: true,
          video: true,
          screen: false
        });
  
        // Publish the local stream to the channel
        this.client.publish(this.localStream);
  
        // Call remote user
        this.client.call(remoteUserId).then(() => {
          console.log('Call successful');
          // Handle success
        }).catch((err:any) => {
          console.error('Failed to make call', err);
        });
      }).catch((err:any) => {
        console.error('Failed to join channel', err);
      });
  
      // Listen for remote stream added event
      this.client.on('user-published', async (user:any, mediaStream:any) => {
        // Subscribe to the remote stream
        await this.client.subscribe(mediaStream);
        // Display the remote stream on the call interface
        const remoteStreamDiv = document.createElement('div');
        remoteStreamDiv.id = `remote-stream-${mediaStream.getId()}`;
        remoteStreamDiv.classList.add('remote-stream');
        document.querySelector('#remote-streams')!.appendChild(remoteStreamDiv);
        mediaStream.play(`remote-stream-${mediaStream.getId()}`);
      });
    }
  

  }
