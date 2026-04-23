import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRow } from './table-row';
import { ProductUi } from '../../models/ProductUi';

describe('TableRow', () => {
  let fixture: ComponentFixture<TableRow>;

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
      imports: [TableRow],
    }).compileComponents();

    fixture = TestBed.createComponent(TableRow);
    fixture.componentRef.setInput('product', productInitial);
    fixture.componentRef.setInput('usuario', '');

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TableRow);
    expect(fixture.componentInstance).toBeTruthy();

  });
});
