import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatuserComponent } from './floatuser.component';

describe('FloatuserComponent', () => {
  let component: FloatuserComponent;
  let fixture: ComponentFixture<FloatuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
