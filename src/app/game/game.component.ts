import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, onSnapshot, addDoc, doc, collectionData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';



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

export class GameComponent implements OnInit {
  
  game!: Game;
  gameId!: string;

  firestore: Firestore = inject(Firestore)

  constructor(private gameService: GameService, private gemeService: GameService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.getNewGame();
    // URL Parameter abonnieren 
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];

      /*      onSnapshot(this.getGameRef(), (game) => {
              game.forEach(element => {
                console.log("Game update:", element.data());
              })
      */
      //es wird nur ein Bestimmtes Dokument abonniert!

      // Eine Abfrage an die Firestore-Datenbank wird gestellt, um ein bestimmtes Dokument abzurufen.
      // Es wird erwartet, dass das Dokument mit der ID 'gameId' in der Sammlung 'games' vorhanden ist.
      onSnapshot(this.gameService.getSingleDocRef('games', this.gameId), (gameSnapshot: any) => {

        // Überprüft, ob das abgerufene Dokument existiert.
        if (gameSnapshot.exists) {

          // Wenn das Dokument existiert, werden seine Daten abgerufen und der Variablen 'game' zugewiesen.
          // Hier wird 'game.data()' verwendet, um die Daten des Dokuments abzurufen.
          const game = gameSnapshot.data();

          // Überprüft, ob Daten im 'game'-Objekt vorhanden sind.
          if (game) {

            // Wenn Daten vorhanden sind, werden die Eigenschaften des 'game'-Objekts auf die entsprechenden Eigenschaften des 'this.game'-Objekts zugewiesen.
            this.game.currentPlayer = game.currentPlayer;
            this.game.playedCards = game.playedCards;
            this.game.players = game.players;
            this.game.stack = game.stack;
            this.game.pickCardAnimation = game.pickCardAnimation;
            this.game.currentCard = game.currentCard;

            // Eine Protokollausgabe, um die aktualisierten Spieldaten anzuzeigen.
            console.log("Game update:", game);
          }
        } else {
          // Protokollausgabe, falls das Dokument nicht existiert.
          console.log("Document does not exist");
        }
      });
    })
  }

  getNewGame() {
    this.game = new Game();

  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      let nextCard = this.game.stack.pop();

      if (nextCard != undefined) {
        this.game.currentCard = nextCard;
      }

      this.game.pickCardAnimation = true;
      console.log('New card: ' + this.game.currentCard);
      console.log('Game is', this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    await updateDoc(this.gameService.getSingleDocRef('games', this.gameId), this.game.toJson())
  }

}


