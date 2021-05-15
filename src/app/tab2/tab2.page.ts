import { Game } from './../models/game.model';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
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
  games: any[];

  userId: any;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private router: ActivatedRoute,
    private alertCtrl: AlertController

  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((data) => {
      this.userId = data.uid;

      console.log('use id');

      console.log(this.userId);
    });
  }

  getCurrentUser() {
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
      componentProps: { 
        gameType: 'my',
      },
      animated: true,
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'register-modal',
    });

    return await modal.present();
  }

  presentConfirm(id: string) {
    console.log("delete");
    
    this.alertCtrl.create({
      // title: "Confirm purchase",
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
  }

  async deleteMyGame(id: string) {
    // show loader
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loader.present();

    await this.firestore.doc('games/' + id).delete();
    // dismiss loader
    loader.dismiss();
  }

  async getGames() {
    // console.log("get posts");

    this.afAuth.authState.subscribe((data) => {
      this.userId = data.uid;
    });

    // show loader
    const loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loader.present();

    try {
      this.firestore
        .collection('games')
        // .doc(this.userId)
        .snapshotChanges()
        .subscribe((data) => {
          // this.games = data.filter((e) => e.payload.doc.id === this.userId);
          this.games = data.map((e) => ({
            id: e.payload.doc.id,
            // eslint-disable-next-line @typescript-eslint/dot-notation
            name: e.payload.doc.data()['name'],
            // eslint-disable-next-line @typescript-eslint/dot-notation
            console: e.payload.doc.data()['console'],
            // eslint-disable-next-line @typescript-eslint/dot-notation
            description: e.payload.doc.data()['description'],
            // eslint-disable-next-line @typescript-eslint/dot-notation
            user: e.payload.doc.data()['user'],
            type: e.payload.doc.data()['type'],
          })).filter(elem => elem.user === this.userId && elem.type === 'my');

          

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
        gameType : 'my'
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
