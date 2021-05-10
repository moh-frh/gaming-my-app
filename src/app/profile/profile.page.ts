import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase
  ) {}

  getCurrentUser() {
    this.afAuth.authState.subscribe(data => {
      console.log('uid: ' + data.uid);
      console.log('email: ' + data.email);
      console.log('emailVerified: ' + data.emailVerified);
      this.profile = data
    });
  }

  getUserFirstName() {
    console.log('profile : ',this.afData.object(`profile/` + this.getCurrentUser()))
    
  }

  ngOnInit() {
    this.getCurrentUser()
    this.getUserFirstName()
  }

}
