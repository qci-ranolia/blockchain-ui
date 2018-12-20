import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimaccountComponent } from './claimaccount.component';

describe('ClaimaccountComponent', () => {
  let component: ClaimaccountComponent;
  let fixture: ComponentFixture<ClaimaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
