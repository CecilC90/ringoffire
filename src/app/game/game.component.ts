import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, onSnapshot, addDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
  ],

  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;
  
 firestore: Firestore = inject(Firestore)

  constructor( public dialog: MatDialog) {    
  }

  ngOnInit(): void {
    this.newNewGame();
    onSnapshot(this.getGameRef(), (game) => {
      game.forEach(element => {
        console.log("Game update:", element.data());
        //console.log("Game update:", this.setGameObject(element.data(), element.id));
      })
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId:string, docId:string) {
    //doc braucht die Datenbank (this.firestore), id von der Sammlung & id von single Document 
    return doc(collection(this.firestore, colId), docId)
  }

  newNewGame() {
    this.game = new Game();
    //this.addNewGame(this.game,'games');
    this.addGame(this.game.toJson());
    
  }

  async addGame(item: {}) {
    await addDoc(this.getGameRef(), item);
  };


  
 
  takeCard() {
    if (!this.pickCardAnimation) {
      let nextCard = this.game.stack.pop();
      if (nextCard != undefined) {
        this.currentCard = nextCard;
      }

      this.pickCardAnimation = true;

      console.log('New card: ' + this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }

    });
  }
}


