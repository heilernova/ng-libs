import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNovaComponent } from './ng-nova.component';

describe('NgNovaComponent', () => {
  let component: NgNovaComponent;
  let fixture: ComponentFixture<NgNovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgNovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
