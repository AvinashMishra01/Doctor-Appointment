import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardData = {};

  constructor(public router: Router, public dataService:DataServiceService) { }

  ngOnInit(): void {

  }

  openForm(data) {

    const queryParams= {
      doctorDetails: JSON.stringify(data)
    }
    
    this.dataService.setCardData(data)
    this.router.navigate(['/appointment', data.id])

  }








  
  isModalOpen = false;



  closeModal() {
    this.isModalOpen = false;
  }


  reciveModalData($event) {

    this.closeModal()
  }

}
