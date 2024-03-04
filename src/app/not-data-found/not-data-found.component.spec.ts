import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDataFoundComponent } from './not-data-found.component';

describe('NotDataFoundComponent', () => {
  let component: NotDataFoundComponent;
  let fixture: ComponentFixture<NotDataFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotDataFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotDataFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
