import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(public router: Router, public dataService: DataServiceService) { }

  patentDetails = { name: '', age: '', ph_no: '', dob: '' };
  appointmentDetails = { date: '', time: '', reason: '' };

  doctorDetails;
  previousSlotList;
  slotsList;
  checkedSlots;

  isPreviousDate=false;
  ngOnInit(): void {
    try {
      this.doctorDetails = this.dataService.getCardData();
      this.slotsList = this.doctorDetails?.slots;
      this.previousSlotList = JSON.parse(JSON.stringify(this.slotsList.map(obj => ({ ...obj }))));

  

    }
    catch (error) {
      console.log("error in appointment", error);
    }
  }

  selectedTime(slots) {

    this.checkedSlots = slots;


    this.slotsList = this.slotsList.filter((item) => {
      if (item.id == this.checkedSlots?.id) {
        item.isBooked = !item.isBooked;
        this.appointmentDetails.time = item.isBooked ? item.time : '';
      } else {
        item.isBooked = false;
      }
      return item;
    })



  }

  checkBirthDate(givenDate){
    let givenDate1= new Date(givenDate)
    let futureDate=this.isDatePast(givenDate1);
    if(futureDate==false){
      Swal.fire("Warning", "How you born in future/today 🤦‍♂️ (DOB can't be today/upcomming date)", "question");
      this.patentDetails.dob='';
    }
   

  }

  isDatePast(date: Date): boolean {
    const today = new Date();
    return date < new Date(today.toDateString());
  }


  async previousBooking() {
    let givenDate= new Date(this.appointmentDetails.date)
    this.isPreviousDate= this.isDatePast(givenDate)
    console.log("given date ", givenDate, "is previous date ", this.isPreviousDate);
    if(this.isPreviousDate){
      Swal.fire("Warning","You can't book appointment for previous date 🤨 ","warning");
      this.appointmentDetails.date=''
    }

    let data = await this.dataService.getSpecficProfessionalPreviousBooking(this.doctorDetails?.id, this.appointmentDetails?.date);

    console.log("slots list ", this.slotsList, "previous slot list ", this.previousSlotList);
    if (data.length > 0) {
      this.slotsList = this.slotsList.map(item => {
        const newItem = { ...item };
        if (data.includes(newItem.id)) {
          newItem['alreadyBooked'] = true;
        }else{
          newItem.alreadyBooked = false;
        }
       
        return newItem;
      });
    } else {
      this.slotsList = [...this.previousSlotList.map(item => ({ ...item }))]; 
    }
  }



  checkValue(value) {
    if (value > 90 && value <= 120) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      })
        .then((result) => {
          if (!result.isConfirmed) {
            this.patentDetails.age = ''
          }
        }
        );

    } else if (value > 120) {
      Swal.fire("Error", "Age is not valid !", 'error');
      this.patentDetails.age = ''
    }
  }


  confirmAppointment() {

    for (let key in this.patentDetails) {
      if (!this.patentDetails[key]) {
        Swal.fire("Warning", "Please fill all the fields in Patent Details 😥", "error");
        return;
      }
    }

    for (let key in this.appointmentDetails) {


      if (key == 'reason' && !this.appointmentDetails[key]) {
        Swal.fire("Warning", "Please don't forgot to write the reason for visit 😊", "warning");
        return;
      }
      else if (!this.appointmentDetails[key]) {
        Swal.fire("Error", "Please fill all the fields in Appointment Details 😒", "error");
        return;
      }
    }

    let storeForFuture = {
      doctor_id: this.doctorDetails.id,
      date: this.appointmentDetails.date,
      time_id: this.checkedSlots.id
    }
    this.dataService.alreadyBooking.push(storeForFuture)

    this.router.navigate(['/home'])
 
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Appointment Confirmed 😉",
      showConfirmButton: false,
      timer: 1500
    });

     }

     cancelAppointment(){
      this.router.navigate(['/home'])
     
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Appointment Cancelled 😤",
        showConfirmButton: false,
        timer: 1500
      });
     }

}
