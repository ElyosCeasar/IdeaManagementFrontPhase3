import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopsSectionMembersMainComponent } from './main.component';

describe('TopsSectionMembersMainComponent', () => {
  let component: TopsSectionMembersMainComponent;
  let fixture: ComponentFixture<TopsSectionMembersMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopsSectionMembersMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsSectionMembersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
