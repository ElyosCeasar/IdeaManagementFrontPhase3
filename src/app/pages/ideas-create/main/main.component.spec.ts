import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IdeasCreateMainComponent } from './main.component';

describe('IdeasCreateMainComponent', () => {
  let component: IdeasCreateMainComponent;
  let fixture: ComponentFixture<IdeasCreateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdeasCreateMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasCreateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
