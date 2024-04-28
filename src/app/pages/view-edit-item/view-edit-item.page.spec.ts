import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEditItemPage } from './view-edit-item.page';

describe('ViewEditItemPage', () => {
  let component: ViewEditItemPage;
  let fixture: ComponentFixture<ViewEditItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
