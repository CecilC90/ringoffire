import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  game: Game = new Game();

  constructor( private gameService: GameService) { }

  newGame() {
    this.gameService.addGame(this.game)
  }
}
