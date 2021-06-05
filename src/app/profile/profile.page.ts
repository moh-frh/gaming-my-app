import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: any;

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';

  

  constructor(
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase,
    private camera: Camera
  ) {}

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async addPhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
}

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
