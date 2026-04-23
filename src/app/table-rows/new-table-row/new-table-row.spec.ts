import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableRow } from './new-table-row';
import { ProductUi } from '../../models/ProductUi';

describe('NewTableRow', () => {
  let component: NewTableRow;
  let fixture: ComponentFixture<NewTableRow>;

  const productInitial: ProductUi = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      marca: '',
      referencia: '',
      activo: true,
      fechaAlta: '',
      audUser: '',
      tempId: '',
      isNew: false
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTableRow],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTableRow);
    fixture.componentRef.setInput('product', productInitial);
    fixture.componentRef.setInput('usuario', '');

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewTableRow);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
