import { Component,OnInit} from '@angular/core';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mainData;
  showData;
  cards;

  active = {
    'all': true,
    'doctor': false,
    'therapists': false,
    'nurses': false
  }

  constructor(public dataService: DataServiceService) {

  }


   ngOnInit() {
  
    this.dataService.getProfessions().subscribe((data) => {
      this.mainData = data
      this.showData = this.mainData
      this.active[this.dataService.getActiveToggel()]= true;
      this.toggelColor(this.dataService.getActiveToggel());
    })
   
  }


   toggelColor(active_tab) {
    Object.keys(this.active).forEach(key => {
      if (key === active_tab) {
        this.active[key] = true;
      } else {
        this.active[key] = false;
      }
    });

  this.dataService.setActiveToggel(active_tab);

   if(active_tab == "all"){
   
    this.showData=this.mainData;
   }else{

  this.showData= this.mainData.filter((item)=>item.profession == active_tab)
    
   }
  }

}

