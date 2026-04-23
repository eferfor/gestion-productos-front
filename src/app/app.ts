import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableRow } from "./table-rows/table-row/table-row";
import { Product } from './models/product';
import { AppService } from './app.service';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, map, merge, Subject, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { NewTableRow } from './table-rows/new-table-row/new-table-row';
import { ProductUi } from './models/ProductUi';
import { FileUpload } from "./file-upload/file-upload";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableRow, NewTableRow, JsonPipe, FileUpload],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gestor-productos-front');

  products = signal<ProductUi[]>([]);

  filtroNombre = signal('');
  filtroCategoria = signal('');
  usuario = signal('Usuario1');

  sinProductosMsg = signal('No hay productos para mostrar');

  private refresh$ = new Subject<void>();

  changeUsuario(event: Event) {
    const input = event.target as HTMLInputElement;
    this.usuario.set(input.value);
  }

  changeFiltroNombre(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filtroNombre.set(input.value);
  }

  changeFiltroCategoria(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filtroCategoria.set(input.value);
  }


  constructor(public appService: AppService) {
    const filtroNombre$ = toObservable(this.filtroNombre);
    const filtroCategoria$ = toObservable(this.filtroCategoria);

    // Crea un array con los filtros y recoge los cambios
    const filtros$ = combineLatest([filtroNombre$, filtroCategoria$]).pipe(
      map(([nombre, categoria]) => ({
        nombre: (nombre ?? '').trim(),
        categoria: (categoria ?? '').trim()
      })),
      debounceTime(300), // no actualiza cambios en menos de 300ms
      distinctUntilChanged((a, b) => a.nombre === b.nombre && a.categoria === b.categoria)
    ); // evita volver a llamar si el filtro no tiene cambios

    const reload$ = merge(
      filtros$,
      this.refresh$.pipe(
        withLatestFrom(filtros$),
        map(([, f]) => f)
      )
    )

    // switchMap lanza la petición, pero cancela si llega un filtro nuevo
    reload$.pipe(
      switchMap(f => this.appService.getProducts(f.nombre, f.categoria)),
      takeUntilDestroyed()).subscribe({
        next: (data) => {
          this.products.set(data)
          this.sinProductosMsg.set("No hay productos para mostrar");
        },
        error: (e) => {
          console.log(e)
          this.sinProductosMsg.set("Error al conectar al servidor");
        }
      });
    }

  newRow(){
    console.log("añadir fila");
    const newRow: ProductUi = {
      tempId: crypto.randomUUID(),
      isNew: true,
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      marca: '',
      referencia: '',
      activo: true,
      audUser: '',
      fechaAlta: ''
    };
    this.products.update(list => [...list, newRow]);
  }

  saveProduct(product: ProductUi){
    console.log(product);
    // Pasa el product recibido de ProductUi a Product
    const payload: Product = {
      ...product, audUser: this.usuario(),
    } as any;

    // Si no tiene tempId es un PUT
    if(!product.tempId){
      this.appService.updateProduct(payload).subscribe({
        next: (updated: ProductUi) => {
          this.products.update(list => {
            const indiceProducto = list.findIndex(p => p.id === updated.id);
            if(indiceProducto === -1) return list;
            const copia = [...list];
            copia[indiceProducto] = {...updated};
            return copia;
          });
        },
        error: (e) => console.log(e)
      });
      return;
    }


    // Si tiene tempId es un POST
    this.appService.postProduct(payload).subscribe({
      // Después de mandar el POST actualiza la lista de productos sin la fila editable y con la entrada añadida
      next: (created: ProductUi) => {
        this.products.update(list => {
          const sinFilaNueva = list.filter(p => p.tempId !== product.tempId);
          return [...sinFilaNueva, created];
        });
      },
      error: (e) => console.log(e)
    });
  }

  deleteRow(row: ProductUi){
    if(row.tempId){
      this.products.update(list => list.filter(product => product.tempId !== row.tempId));
      return;
    }

    let id = row.id;

    this.appService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(list => {
          const sinEliminado = list.filter(p => p.id !== id);
          return [...sinEliminado];
        });
      },
      error: (e) => console.log(e)
    });
  }

  refreshProducts(){
    this.refresh$.next();
    console.log("refrescado");
  }

  /*productsFixed = signal([
    {
      id: 1,
      nombre: "SRPM07",
      descripcion: "Reloj Seiko Pantera Rosa",
      precio: 520,
      categoria: "ACCESORIOS",
      marca: "Seiko",
      referencia: "SRPM07",
      activo: true,
      fecha_alta: "2026-04-14",
      audUser: "1"
    },
    {
      id: 2,
      nombre: "Patata",
      descripcion: "Una patata",
      precio: 0.3,
      categoria: "COMIDA",
      marca: "Cachelos",
      referencia: "PTT01",
      activo: true,
      fecha_alta: "2026-04-14",
      audUser: "1"
    },
    {
      id: 3,
      nombre: "Tutto Carrà",
      descripcion: "Disco de Raffaella Carrà",
      precio: 15.99,
      categoria: "MÚSICA",
      marca: "Sony Music",
      referencia: "MS001",
      activo: true,
      fecha_alta: "2026-04-14",
      audUser: "1"
    },
    {
      id: 4,
      nombre: "Leche",
      descripcion: "Brick de leche de 1L",
      precio: 2,
      categoria: "COMIDA",
      marca: "Leyma",
      referencia: "LCH01",
      activo: true,
      fecha_alta: "2026-04-14",
      audUser: "1"
    },
  ])
  */

}
