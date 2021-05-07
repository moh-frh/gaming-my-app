/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, ToastController, LoadingController, NavController } from '@ionic/angular';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.page.html',
  styleUrls: ['./edit-game.page.scss'],
})
export class EditGamePage implements OnInit {

  game = {} as Game;
  gameId;
  id: any;


  constructor(
    public modalController: ModalController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log(`${this.gameId}`);
    this.id = this.gameId;

    this.getGameById(this.id);
  }

  async getGameById(id: string) {
    // show loader
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.present();

    this.firestore
      .doc('games/' + id)
      .valueChanges()
      .subscribe(data => {
        this.game.name = data['name'];
        this.game.console = data['console'];
        this.game.description = data['description'];
        // dismiss loader
        loader.dismiss();
      });
  }


async dismiss() {
    return await this.modalController.dismiss();
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

  async editGame(game: Game) {
    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...'
      });
      loader.present();

      try {
        await this.firestore.doc('games/' + this.id).update(game);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      await loader.dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot('tabs/tab2');
      this.dismiss();
    }
  }

}
