import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdashComponent } from './eventdash.component';

describe('EventdashComponent', () => {
  let component: EventdashComponent;
  let fixture: ComponentFixture<EventdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
