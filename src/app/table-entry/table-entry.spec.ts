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
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
