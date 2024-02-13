import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modalTitle: string;
  @Output() closeModalEvent = new EventEmitter<any>();


  close=false;
  closeModal() {
    this.closeModalEvent.emit(!this.close);
  }
}
