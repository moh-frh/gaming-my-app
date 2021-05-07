import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    public modalCtrl: ModalController,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {}

  async login(user: User) {
    // console.log(user);

    this.router.navigate(['/tabs']);


    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      loader.present();


      // try {
      //   // login user with email and password
      //   await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      //     .then(data => {
      //       console.log(data);

      //       // redirect to home page
      //       // this.navCtrl.navigateRoot('home');
      //       this.dismiss();
      //       this.router.navigate(['/tabs']);
      //     })
      //     .catch();
      // } catch (e) {
      //   this.showToast(e);
      // }

      // dismis loader
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      // show toast message
      this.showToast('Enter email');
      return false;
    }

    if (!this.user.password) {
      // show toast message
      this.showToast('Enter password');
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }


  async dismiss() {
    await this.modalCtrl.dismiss();
  }


    // const modal = await this.modalCtrl.create({
    //   component: Tab1Page
    // });
    // return await modal.present();
    // this.dismiss();
    // this.router.navigate(['/tabs']);


}
