import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IdeasShowMainComponent } from './main.component';

describe('IdeasShowMainComponent', () => {
  let component: IdeasShowMainComponent;
  let fixture: ComponentFixture<IdeasShowMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeasShowMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasShowMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
