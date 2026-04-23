import { Component, signal } from '@angular/core';
import { TableEntry } from '../../table-entry/table-entry';
import { ProductRowBase } from '../product-row-base';

@Component({
  selector: 'tr[app-new-table-row]',
  imports: [TableEntry],
  templateUrl: './new-table-row.html',
  styleUrl: '../table-row/table-row.css',
  standalone: true,
})
export class NewTableRow extends ProductRowBase {
  editing = signal(true);

  saveProduct() {
    console.log("Guardando producto");
    this.emitSave();
  }

  cancelNewRow(event: Event){
    console.log("Cancelar fila");
    this.emitDelete();
  }

}
