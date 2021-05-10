import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { AddGamePage } from '../add-game/add-game.page';
import { EditGamePage } from '../edit-game/edit-game.page';
import { GamePage } from '../game/game.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  games: any;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private router: ActivatedRoute,
  ) {}

  getCurrentUser(){
    // console.log(this.afAuth.currentUser);
     
  }

  async openMovie() {
    const modal = await this.modalController.create({
      component: GamePage,
    });
    return await modal.present();
  }

  async addNewMyGame() {
    const modal = await this.modalController.create({
      component: AddGamePage,
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    });

    return await modal.present();
  }

  async deleteMyGame(id: string) {
    // console.log(this.afAuth.currentUser.uid);

    // console.log(id);

    // show loader
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.present();

    await this.firestore.doc('games/' + id).delete();
    // dismiss loader
    loader.dismiss();
  }

  async getGames() {
    // console.log("get posts");

    // show loader
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loader.present();

    try {
      this.firestore
        .collection('games')
        .snapshotChanges()
        .subscribe((data) => {
          this.games = data.map((e) => ({
            id: e.payload.doc.id,
            // eslint-disable-next-line @typescript-eslint/dot-notation
            name: e.payload.doc.data()['name'],
            // eslint-disable-next-line @typescript-eslint/dot-notation
            console: e.payload.doc.data()['console'],
            // eslint-disable-next-line @typescript-eslint/dot-notation
            description: e.payload.doc.data()['description'],
          }));

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  async editMyGame(id) {

    const modal = await this.modalController.create({
      component: EditGamePage,
      componentProps: {
        gameId: id,
      },
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    });

    return await modal.present();
  }

  ionViewWillEnter() {
    this.getGames();
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }
}
