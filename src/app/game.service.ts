import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore)

  constructor(private router: Router,) { }


  async addGame(game: Game) {
    await addDoc(collection(this.firestore, 'games'), game.toJson())
    .then((gameInfo:any) => {
      console.log(gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    }); 
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    //doc braucht die Datenbank (this.firestore), id von der Sammlung & id von single Document 
    return doc(collection(this.firestore, colId), docId)
  }

}
