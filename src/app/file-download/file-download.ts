import { Component, input } from '@angular/core';
import { ProductUi } from '../models/ProductUi';
import * as XLSX from 'xlsx';
import { AppService } from '../app.service';

@Component({
  selector: 'app-file-download',
  imports: [],
  templateUrl: './file-download.html',
  styleUrl: './file-download.css',
})
export class FileDownload {
  products = input.required<ProductUi[]>();
  filtroNombre = input<string>();
  filtroCategoria = input<string>();

  constructor(public appService: AppService) {}

  descargarAngular() {
    const worksheet = XLSX.utils.json_to_sheet(this.products());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ProductosFiltrados');
    XLSX.writeFile(workbook, 'productos.xlsx');
  }

  descargarSpring() {
    this.appService.downloadExcel(this.filtroNombre(), this.filtroCategoria()).subscribe({
      next: (res) => {
        const blob = res.body!;
        const cd = res.headers.get('content-disposition') || '';

        const match = cd.match(/filename="(.+?)"/);
        const filename = match?.[1] ?? 'productos.xlsx';

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error(err)
    });
  }

}
