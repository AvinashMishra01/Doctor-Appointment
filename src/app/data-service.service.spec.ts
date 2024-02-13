import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataServiceService', () => {
  let service: DataServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataServiceService]
    });
    service = TestBed.inject(DataServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve professions from the API via GET', () => {
    const mockProfessions = [
      { id: 1, name: 'Doctor' },
      { id: 2, name: 'Nurse' },
      // Add more mock data as needed
    ];

    service.getProfessions().subscribe(professions => {
      expect(professions).toEqual(mockProfessions);
    });

    const req = httpMock.expectOne('../assets/data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfessions);
  });

  it('should set and retrieve card data', () => {
    const mockCardData = { id: 1, name: 'John Doe' };
    service.setCardData(mockCardData);
    const retrievedCardData = service.getCardData();
    expect(retrievedCardData).toEqual(mockCardData);
  });



});
