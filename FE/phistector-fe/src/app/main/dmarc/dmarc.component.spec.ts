import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmarcComponent } from './dmarc.component';

describe('DmarcComponent', () => {
  let component: DmarcComponent;
  let fixture: ComponentFixture<DmarcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmarcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmarcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
