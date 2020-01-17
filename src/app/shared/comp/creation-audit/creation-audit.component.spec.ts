import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationAuditComponent } from './creation-audit.component';

describe('CreationAuditComponent', () => {
  let component: CreationAuditComponent;
  let fixture: ComponentFixture<CreationAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
