import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageCommitteeMemberMainComponent } from './main.component';

describe('ManageCommitteeMemberMainComponent', () => {
  let component: ManageCommitteeMemberMainComponent;
  let fixture: ComponentFixture<ManageCommitteeMemberMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCommitteeMemberMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCommitteeMemberMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
