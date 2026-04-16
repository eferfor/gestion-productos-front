import { Directive, input, output, signal } from '@angular/core';
import { ProductUi } from '../models/ProductUi';

type DraftFields = Pick<ProductUi,
 'nombre' | 'descripcion' | 'precio' | 'categoria' | 'marca' | 'referencia' | 'activo' | 'audUser'
 >;

@Directive()
/* input y output no se pueden usar si la
 * clase no es @Component. Como es una clase
 * para que hereden las otras rows, se marca
 * como @Directive y así ignora el error de
 * input/output.
*/
export abstract class ProductRowBase {
  product = input.required<ProductUi>();
  usuario = input.required<string>();

  save = output<ProductUi>();
  delete = output<ProductUi>();

  draft = signal<DraftFields>({
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    marca: '',
    referencia: '',
    activo: true,
    audUser: ''
  });

  showErrorPrecio = signal<boolean>(false);
  showErrorActivo = signal<boolean>(false);

  parsePrecio(raw: string): number{
    const n = Number(raw.trim());
    if(Number.isNaN(n)) this.showErrorPrecio.set(true);
    else this.showErrorPrecio.set(false);
    return Number.isFinite(n) ? n : 0;
  }

  parseActivo(raw: string): boolean{
    const v = raw.trim().toLowerCase();
    if(v !== 'true' && v !== 'false') this.showErrorActivo.set(true);
    else this.showErrorActivo.set(false);
    return v === 'true' ? true : v === 'false' ? false : false;
  }

  /* Crea el producto con los valores actualizados que
   * se va a enviar con save o delete
   * extra: parámetro opcional que permite hacer
   * cambios puntuales, ej: emitSave({ activo: true })
  */
  protected buildUpdated(extra?: Partial<ProductUi>): ProductUi{
    return { ...this.product(), ...this.draft(), audUser: this.usuario(), ...extra };
  }

  emitSave(extra?: Partial<ProductUi>){
    this.save.emit(this.buildUpdated(extra));
    this.showErrorActivo.set(false);
    this.showErrorPrecio.set(false);
  }

  emitDelete(){
    this.delete.emit(this.product());
    this.showErrorActivo.set(false);
    this.showErrorPrecio.set(false);
  }

}
