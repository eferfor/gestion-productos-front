import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableRow } from './new-table-row';

describe('NewTableRow', () => {
  let component: NewTableRow;
  let fixture: ComponentFixture<NewTableRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTableRow],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTableRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
