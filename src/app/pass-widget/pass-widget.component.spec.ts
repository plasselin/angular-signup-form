import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassWidgetComponent } from './pass-widget.component';

describe('PassWidgetComponent', () => {
  let component: PassWidgetComponent;
  let fixture: ComponentFixture<PassWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassWidgetComponent]
    });
    fixture = TestBed.createComponent(PassWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
