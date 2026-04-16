import { Component, signal } from '@angular/core';
import { TableEntry } from '../../table-entry/table-entry';
import { NgClass, DatePipe } from '@angular/common';
import { ProductRowBase } from '../product-row-base';

@Component({
  selector: 'tr[app-table-row]',
  imports: [TableEntry, NgClass, DatePipe],
  templateUrl: './table-row.html',
  styleUrl: './table-row.css',
})
export class TableRow extends ProductRowBase {
  editing = signal(false);
  hideBtnGrp1 = signal(false);
  hideBtnGrp2 = signal(true);

  editProduct() {
    console.log("Editando producto");
    // Habilita edición de la tabla
    if (!this.editing()) { // Cuando no se está editando, settea todo al original
      const p = this.product();
      this.draft.set({
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        categoria: p.categoria,
        marca: p.marca,
        referencia: p.referencia,
        activo: p.activo,
        audUser: p.audUser
      });
      this.editing.set(true);
      this.hideBtnGrp1.set(true);
      this.hideBtnGrp2.set(false);
      this.showErrorActivo.set(false);
      this.showErrorPrecio.set(false);
    }else{
      this.editing.set(false);
      this.hideBtnGrp2.set(true);
      this.hideBtnGrp1.set(false);
      this.showErrorActivo.set(false);
      this.showErrorPrecio.set(false);
    }
  }

  saveProduct() {
    console.log("Guardando producto");
    this.emitSave();
    this.editing.set(false);
    this.hideBtnGrp2.set(true);
    this.hideBtnGrp1.set(false);
  }

  deleteProduct() {
    console.log("Eliminando producto");
    this.emitDelete();
  }

}
