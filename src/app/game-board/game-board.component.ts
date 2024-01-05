

// game-board.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})

export class GameBoardComponent implements OnInit {
  gameCompleted: boolean = false;
  cards: { value: string, isMatched: boolean,imagepath:string}[] = [];
  matchedCards: string[] = [];
  showButtons = true;
  moves = 0;
  misses = 0;
  accuracy = 0;

  gameMode6(): void {
    this.showButtons = false;
    this.gameCompleted = false;
    this.cards = [
      { value: 'A', isMatched: false, imagepath:'assets/tom&jerry.jpg' },
      { value: 'B', isMatched: false, imagepath:'assets/jerry.png' },
      { value: 'C', isMatched: false, imagepath:'assets/doreamon.jpg' }
    ];
    this.initializeGame(); 
  }

  gameMode12(): void {
    this.showButtons = false;
    this.gameCompleted = false;
    this.cards = [
      { value: 'A', isMatched: false, imagepath: 'assets/tom&jerry.jpg' },
      { value: 'B', isMatched: false, imagepath: 'assets/jerry.png' },
      { value: 'C', isMatched: false, imagepath: 'assets/doreamon.jpg' },
      { value: 'D', isMatched: false, imagepath: 'assets/gian.jpg' },
      { value: 'E', isMatched: false, imagepath: 'assets/nobitha.png' },
      { value: 'F', isMatched: false, imagepath: 'assets/shizuka.png' }
    ];
    this.initializeGame();
    
  }

  shuffledCards: {value: string, isMatched: boolean, imagepath:string;}[] = [];
  flippedCardIndices: number[] = [];

  private initializeGame(): void {
    this.shuffledCards = this.shuffleCards([...this.cards, ...this.cards]);
    this.cards = this.shuffledCards.map(card => ({ value: card.value, isMatched: card.isMatched, imagepath: card.imagepath }));
  }

  ngOnInit(): void {
    this.shuffledCards = this.shuffleCards([...this.cards, ...this.cards]);
    this.cards = this.shuffledCards.map(card => ({ value: card.value, isMatched: card.isMatched, imagepath: card.imagepath }));
  }

  onCardClicked(index: number): void {
    
    if (!this.cards[index].isMatched && this.flippedCardIndices.length < 2 && !this.flippedCardIndices.includes(index)) {
      this.flippedCardIndices.push(index);

      if (this.flippedCardIndices.length === 2) {
        this.moves++;
        setTimeout(() => {
          this.checkMatch();
        }, 1000);
      }
    }

    
  }

  checkMatch(): void {
    const [index1, index2] = this.flippedCardIndices;
    if (this.shuffledCards[index1].value === this.shuffledCards[index2].value) {
      // Match found
      this.matchedCards.push(this.cards[index1].value)
      this.cards[index1].isMatched = true;
      this.cards[index2].isMatched = true;
    }
    else this.misses++;
    this.flippedCardIndices = [];
    if (this.matchedCards.length *2 === this.cards.length) {
      this.accuracy = ((this.cards.length  - this.misses) / (this.cards.length )) * 100;
      this.gameCompleted = true;
      this.showButtons=true;
      this.matchedCards=[];

    }
  }
  
  shuffleCards(cards: { value: string, isMatched: boolean, imagepath:string }[]): { value: string, isMatched: boolean, imagepath:string }[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }
}
