// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardComponent } from './card.component';

// describe('CardComponent', () => {
//   let component: CardComponent;
//   let fixture: ComponentFixture<CardComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [CardComponent]
//     });
//     fixture = TestBed.createComponent(CardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { CardComponent } from './card.component';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let router: Router;
  let dataServiceSpy: jasmine.SpyObj<DataServiceService>;

  beforeEach(async(() => {
    const dataServiceMock = jasmine.createSpyObj('DataServiceService', ['setCardData']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardComponent],
      providers: [
        { provide: DataServiceService, useValue: dataServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dataServiceSpy = TestBed.inject(DataServiceService) as jasmine.SpyObj<DataServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to appointment page with doctor details', () => {
    const doctorDetails = { id: '1', name: 'Dr. John Doe', specialization: 'Cardiologist' };
    const navigateSpy = spyOn(router, 'navigate');
    component.openForm(doctorDetails);
    expect(dataServiceSpy.setCardData).toHaveBeenCalledWith(doctorDetails);
    expect(navigateSpy).toHaveBeenCalledWith(['/appointment', doctorDetails.id]);
  });

  it('should close modal', () => {
    component.isModalOpen = true;
    component.closeModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should receive modal data and close modal', () => {
    component.reciveModalData(null);
    expect(component.isModalOpen).toBeFalse();
  });
});

