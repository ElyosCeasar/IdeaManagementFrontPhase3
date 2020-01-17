import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WinnersShowMainComponent } from './main.component';

describe('WinnersShowMainComponent', () => {
  let component: WinnersShowMainComponent;
  let fixture: ComponentFixture<WinnersShowMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WinnersShowMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnersShowMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
