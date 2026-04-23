import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEntry } from './table-entry';

describe('TableEntry', () => {
  let component: TableEntry;
  let fixture: ComponentFixture<TableEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(TableEntry);
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.setInput('focusClass', false);
    fixture.componentRef.setInput('newClass', '');
    fixture.componentRef.setInput('value', '');
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableEntry);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
