import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'chatt-dashboard';
  username = 'username';
  message = '';
  photo = '';
  url: any = '';
  photoName: any = '';
  public data: any;
  oldMessages: any = [];
  receiveMessages: any = {};
  dataShow: any[] = [];
  messages: any[] = [];
  formWorker: any=[];
  formBuilder: any;
  senderId:any;
  getEvent:any;
  constructor(private http: HttpClient,private fb:FormBuilder) {}
  ngOnInit(): void {

    // createForm(){
      this.formWorker=this.fb.group({
        gallery:[this.data?.images || '',[Validators.required]],
      })
    this.data = this.http
      .post('https://valucleaning.erp-everest.com/api/room-messages', {
        id: 7,
        token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS52YWx1Y2xlYW4uY28vYXBpL2xvZ2luIiwiaWF0IjoxNjgxOTEyNTcyLCJleHAiOjE2ODE5MTYxNzIsIm5iZiI6MTY4MTkxMjU3MiwianRpIjoia0Q0VWxPYjNTU1h1dlkwTyIsInN1YiI6IjI2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.ChKGLuhV0TUgCHG2mVxQhxBASwpVwlNrEKjQKFidos0"

      })
      .subscribe(
        (responseData) => {
          // This is where you can access the data returned from the subscription.
          this.data = responseData;
          console.log(this.data.data);
          this.oldMessages = this.data.data;
        },
        (error) => {
          console.error(error);
        }
      );

    Pusher.logToConsole = true;

    var pusher = new Pusher('cbe947b09a127d1d6084', {
      cluster: 'mt1',
    });

    const channel = pusher.subscribe('new-message');
    channel.bind('new-message', (data: any) => {
      // alert(data.message.message)
      console.log(data.message.sender_id)
      if(this.getEvent!=='event'){
        this.getEvent='pusher'
      }
      return this.messages.push(data.message.message);
    });
  }

  channel(channel: any) {
    throw new Error('Method not implemented.');
  }

  submit(): void {
    this.http
      .post('https://api.valuclean.co/api/store-message', {
        // room_id: 1,
        // photo:'AwgG2zvif/Cap2.PNG',
        message: this.message,
        token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS52YWx1Y2xlYW4uY28vYXBpL2xvZ2luIiwiaWF0IjoxNjgxOTEyNTcyLCJleHAiOjE2ODE5MTYxNzIsIm5iZiI6MTY4MTkxMjU3MiwianRpIjoia0Q0VWxPYjNTU1h1dlkwTyIsInN1YiI6IjI2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.ChKGLuhV0TUgCHG2mVxQhxBASwpVwlNrEKjQKFidos0"

      })
      .subscribe(() => (this.message = ''));
  }

  select(event: any) {
    this.message = event.target.value;
    this.getEvent="event";
  }

  selectPhoto(event: any) {
    if (!event || !event.target) {
      return;
    }
    this.photoName = event.target.value!;
    this.formWorker.get('gallery')?.setValue(event.target.files[0]);

    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        // console.log(this.url);
      };
    }
  }


}
