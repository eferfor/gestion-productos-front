import { Component, input } from '@angular/core';
import { ProductUi } from '../models/ProductUi';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-download',
  imports: [],
  templateUrl: './file-download.html',
  styleUrl: './file-download.css',
})
export class FileDownload {
  products = input.required<ProductUi[]>();

  descargarAngular() {
    const worksheet = XLSX.utils.json_to_sheet(this.products());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ProductosFiltrados');
    XLSX.writeFile(workbook, 'productos.xlsx');
  }

}
