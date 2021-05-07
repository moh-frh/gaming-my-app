import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
