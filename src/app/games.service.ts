import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  
  getGames(){
    return this.http.get('https://nodejsapigames.herokuapp.com/games')
  }

  test(){
    return 'test'
  }
}
