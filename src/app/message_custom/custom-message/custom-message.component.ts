import { Component, Inject, Input } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-message',
  templateUrl: './custom-message.component.html',
  styleUrls: ['./custom-message.component.css']
})
export class CustomMessageComponent {
  @Input() message: string = '';
  @Input() duration: number = 3000;

  ngOnInit() {
    setTimeout(() => {
      this.closeMessage();
    }, this.duration);
  }

  closeMessage() {
    const element = document.getElementById('customMessage');
    if (element) {
      element.style.display = 'none';
    }
  }
}
