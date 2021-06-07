import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { GamesService } from '../games.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id: any;

  games: any;

  constructor(private route: ActivatedRoute, private gamesService: GamesService) {
    this.id = this.route.snapshot.params.id

    this.getGames()

    console.log(this.games);
    
    

  }

  getGames(){
    this.gamesService.getGames().subscribe(
      result => { this.games = result}
    )
  }

  

}
