import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellRendererComponent } from './cell-renderer.component';

describe('CellRendererComponent', () => {
  let component: CellRendererComponent;
  let fixture: ComponentFixture<CellRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellRendererComponent]
    });
    fixture = TestBed.createComponent(CellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
