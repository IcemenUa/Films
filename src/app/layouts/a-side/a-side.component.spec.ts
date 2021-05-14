import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASideComponent } from './a-side.component';

describe('ASideComponent', () => {
  let component: ASideComponent;
  let fixture: ComponentFixture<ASideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
