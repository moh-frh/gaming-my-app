import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private router: Router,

    ) {}

  ngOnInit() {}

  async dismiss() {
    return await this.modalController.dismiss();
  }

    async register(user: User) {
      // console.log(user);

      if (this.formValidation()) {

        // show loader
        const loader = await this.loadingCtrl.create({
          message: 'Please wait...'
        });
        loader.present();

        try {
          // register user with email and password
          await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(async data => {
              // console.log(data);

              this.dismiss();
            this.router.navigate(['/tabs/tab1']);

            })
            .catch();
        } catch (e) {
          this.showToast(e);
        }

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

}
