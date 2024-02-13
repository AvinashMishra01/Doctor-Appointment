import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';






@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
// data;
  constructor(public http:HttpClient) {}

professions;
cardData;

alreadyBooking=[]
active_tab='all'
getProfessions() {
 return this.http.get("../assets/data.json");

}


setCardData(data){
this.cardData=data;

}

getCardData(){
  return this.cardData;
}

getAlreadyBooking(){
  return this.alreadyBooking;
}

 async getSpecficProfessionalPreviousBooking(id, date){
  let arr_of_time_id=[];
  let data=  this.alreadyBooking.filter((item)=> {
    if(item.doctor_id==id && item.date==date){
      arr_of_time_id.push(item.time_id);
      return item
    }
  })

  return arr_of_time_id;
}

setActiveToggel(tab){
this.active_tab=tab
}

getActiveToggel(){
  return this.active_tab;
}



}
