
// card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() value!: string;
  @Input() isFlipped!: boolean;
  @Input() isMatched!: boolean;
  @Output() cardClicked = new EventEmitter<void>();

  onCardClick(): void {
    if (!this.isFlipped && !this.isMatched) {
      this.cardClicked.emit();
    }
  }
}
