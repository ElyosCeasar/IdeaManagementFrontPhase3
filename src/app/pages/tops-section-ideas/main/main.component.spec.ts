import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopsSectionIdeasMainComponent } from './main.component';

describe('TopsSectionIdeasMainComponent', () => {
  let component: TopsSectionIdeasMainComponent;
  let fixture: ComponentFixture<TopsSectionIdeasMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopsSectionIdeasMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsSectionIdeasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
