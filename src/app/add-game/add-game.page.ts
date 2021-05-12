import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Game } from '../models/game.model';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {

  game = {} as Game;

  constructor(
    public modalController: ModalController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private afData: AngularFireDatabase
    ) { }

    getCurrentUserId() {
      this.afAuth.authState.subscribe(data => {
        this.game.user = data.uid
      });
    }


  ngOnInit() {
    this.getCurrentUserId()
  }

  async dismiss() {
    return await this.modalController.dismiss();
  }

  async createGame(game: Game) {

    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      loader.present();

      try {
        await this.firestore.collection('games').add(game);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      loader.dismiss();

      // redirect to home page
      // this.navCtrl.navigateRoot('home');
      this.dismiss();
    }
  }

  formValidation() {
    if (!this.game.name) {
      // show toast message
      this.showToast('Enter name');
      return false;
    }

    if (!this.game.console) {
      // show toast message
      this.showToast('Enter console');
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
