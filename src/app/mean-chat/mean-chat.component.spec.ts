import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanChatComponent } from './mean-chat.component';

describe('MeanChatComponent', () => {
  let component: MeanChatComponent;
  let fixture: ComponentFixture<MeanChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeanChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeanChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
