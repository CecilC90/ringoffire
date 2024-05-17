import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot, doc, DocumentReference  } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore)

  constructor(private router: Router,) { }


  // Methode, um ein Spiel zur Firestore-Datenbank hinzuzufügen
  async addGame(game: Game) {
    // Hinzufügen des Spiels zur Firestore-Datenbank als neues Dokument in der Sammlung 'games'
    await addDoc(collection(this.firestore, 'games'), game.toJson())
      // Nachdem das Spiel erfolgreich hinzugefügt wurde
      .then((gameInfo: any) => {
        // Protokollieren der ID des hinzugefügten Spiels in der Konsole
        console.log(gameInfo.id);
        // Navigation zur Spielansicht, wobei die ID des hinzugefügten Spiels in der URL enthalten ist
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
