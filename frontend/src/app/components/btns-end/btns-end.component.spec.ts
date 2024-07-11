import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsEndComponent } from './btns-end.component';

describe('BtnsEndComponent', () => {
  let component: BtnsEndComponent;
  let fixture: ComponentFixture<BtnsEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnsEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnsEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
