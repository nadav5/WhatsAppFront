import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  @Input() public description: string = '';
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  public closePopup(): void {
    this.close.emit();
  }
}
