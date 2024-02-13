// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AppointmentComponent } from './appointment.component';

// describe('AppointmentComponent', () => {
//   let component: AppointmentComponent;
//   let fixture: ComponentFixture<AppointmentComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppointmentComponent]
//     });
//     fixture = TestBed.createComponent(AppointmentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppointmentComponent } from './appointment.component';
import { DataServiceService } from '../data-service.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataServiceService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DataServiceService', ['getCardData', 'getSpecficProfessionalPreviousBooking', 'alreadyBooking']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule],
      declarations: [AppointmentComponent],
      providers: [{ provide: DataServiceService, useValue: spy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataServiceService) as jasmine.SpyObj<DataServiceService>;
    component.doctorDetails = { id: 1, name: 'Dr. John', slots: [{ id: 1, time: '10:00 AM', isBooked: false }] };
    component.checkedSlots = { id: 1, time: '10:00 AM' };
    component.appointmentDetails = { date: '2024-02-14', time: '10:00 AM', reason: 'Regular checkup' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize component properties on ngOnInit', () => {
  //   const mockDoctorDetails = { id: 1, name: 'Dr. John', slots: [{ id: 1, time: '10:00 AM', isBooked: false }] };
  //   dataServiceSpy.getCardData.and.returnValue(mockDoctorDetails);
  //   fixture.detectChanges();
  //   expect(component.doctorDetails).toEqual(mockDoctorDetails);
  //   expect(component.slotsList).toEqual(mockDoctorDetails.slots);
  //   expect(component.previousSlotList).toEqual(mockDoctorDetails.slots);
  // });

  // it('should filter available slots when selecting time', () => {
  //   component.selectedTime(component.checkedSlots);
  //   expect(component.slotsList[0].isBooked).toBeTruthy();
  //   expect(component.appointmentDetails.time).toEqual('10:00 AM');
  // });

  // it('should check if given date is past or today', () => {
  //   component.checkBirthDate('2024-02-14');
  //   expect(Swal.fire).toHaveBeenCalledWith("Warning", "How you born in future/today 🤦‍♂️ (DOB can't be today/upcoming date)", "question");
  // });

  // it('should check if date is past or today before making previous booking', async () => {
  //   component.isPreviousDate = true;
  //   spyOn(Swal, 'fire');
  //   await component.previousBooking();
  //   expect(Swal.fire).toHaveBeenCalledWith("Warning", "You can't book appointment for previous date 🤨 ", "warning");
  // });

  // it('should confirm appointment and navigate to home page', () => {
  //   spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
  //   spyOn(Swal, 'fire');
  //   component.confirmAppointment();
  //   expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
  //   expect(Swal.fire).toHaveBeenCalledWith({
  //     position: "top-end",
  //     icon: "success",
  //     title: "Appointment Confirmed 😉",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
  // });

  // it('should cancel appointment and navigate to home page', () => {
  //   spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
  //   spyOn(Swal, 'fire');
  //   component.cancelAppointment();
  //   expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
  //   expect(Swal.fire).toHaveBeenCalledWith({
  //     position: "top-end",
  //     icon: "warning",
  //     title: "Appointment Cancelled 😤",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });
  // });

});
