import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluationIdeasMainComponent } from './main.component';

describe('EvaluationIdeasMainComponent', () => {
  let component: EvaluationIdeasMainComponent;
  let fixture: ComponentFixture<EvaluationIdeasMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationIdeasMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationIdeasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
