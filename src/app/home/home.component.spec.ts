// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({

//       declarations: [HomeComponent]
//     });
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DataServiceService } from '../data-service.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataServiceService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DataServiceService', ['getProfessions', 'getActiveToggel', 'setActiveToggel']);
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: DataServiceService, useValue: spy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dataServiceSpy = TestBed.inject(DataServiceService) as jasmine.SpyObj<DataServiceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch professions data on init', () => {
  //   const mockData = [{ profession: 'doctor' }, { profession: 'therapists' }, { profession: 'nurses' }];
  //   dataServiceSpy.getProfessions.and.returnValue(of(mockData));
  //   fixture.detectChanges();
  //   expect(dataServiceSpy.getProfessions).toHaveBeenCalled();
  //   expect(component.mainData).toEqual(mockData);
  //   expect(component.showData).toEqual(mockData);
  // });

  // it('should toggle color and update showData when toggling profession type', () => {
  //   const mockData = [{ profession: 'doctor' }, { profession: 'therapists' }, { profession: 'nurses' }];
  //   dataServiceSpy.getProfessions.and.returnValue(of(mockData));
  //   dataServiceSpy.getActiveToggel.and.returnValue('therapists');
  //   fixture.detectChanges();
  //   expect(component.active).toEqual({ 'all': false, 'doctor': false, 'therapists': true, 'nurses': false });
  //   expect(component.showData).toEqual([{ profession: 'therapists' }]);
  //   expect(dataServiceSpy.setActiveToggel).toHaveBeenCalledWith('therapists');
  // });
});
