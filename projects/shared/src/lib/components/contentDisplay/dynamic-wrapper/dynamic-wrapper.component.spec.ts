import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWrapperComponent } from './dynamic-wrapper.component';

describe('DynamicWrapperComponent', () => {
  let component: DynamicWrapperComponent;
  let fixture: ComponentFixture<DynamicWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
