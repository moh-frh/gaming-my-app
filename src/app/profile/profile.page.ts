import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireStorage } from '@angular/fire/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string;
  upload: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase,
    private camera: Camera,
    public afSG: AngularFireStorage,
    public loadingController: LoadingController,
    public alertController: AlertController,

  ) {}

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    return await this.camera.getPicture(options);
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }

  async uploadFirebase() {
    const loading = await this.loadingController.create({
      duration: 2000
    });
    await loading.present();
    this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.upload.then(async () => {
      await loading.onDidDismiss();
      this.image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
      const alert = await this.alertController.create({
        header: 'Félicitation',
        message: 'L\'envoi de la photo dans Firebase est terminé!',
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  getCurrentUser() {
    this.afAuth.authState.subscribe((data) => {
      console.log('uid: ' + data.uid);
      console.log('email: ' + data.email);
      console.log('emailVerified: ' + data.emailVerified);
      this.profile = data;
    });
  }

  getUserFirstName() {
    console.log(
      'profile : ',
      this.afData.object(`profile/` + this.getCurrentUser())
    );
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getUserFirstName();
  }
}
