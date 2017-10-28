import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleApiComponent } from './google-api.component';

describe('GoogleApiComponent', () => {
  let component: GoogleApiComponent;
  let fixture: ComponentFixture<GoogleApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
