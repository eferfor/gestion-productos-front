import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, input, output, ViewChild } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.css', '../app.css']
})
export class FileUpload {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  fileName = 'Aún no se ha seleccionado un archivo.';
  uploading = false;
  errorMsg = '';

  uploaded = output<void>();

  constructor(private api: AppService){}

  onFileSelected(e: Event){
    this.errorMsg = '';
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if(!file){
      this.selectedFile = null;
      this.fileName = 'Aún no se ha seleccionado un archivo.';
      return;
    }

    if(!file.name.toLowerCase().endsWith('.csv')){
      this.resetInput();
      this.errorMsg = 'Sólo se permiten archivo .csv';
      return
    }

    this.selectedFile = file;
    this.fileName = file.name;
  }

  openFilePicker(){
    this.errorMsg = '';
    this.fileInput.nativeElement.click();
  }

  upload(){
    this.errorMsg = '';

    if(!this.selectedFile){
      this.errorMsg = 'Selecciona un archivo antes de subir.';
      return;
    }

    this.uploading = true;

    this.api.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.resetInput();
        this.uploaded.emit();
      },
      error: (e) => {
        this.uploading = false;
        this.errorMsg = e?.error?.message ?? 'Error subiendo el archivo.';
      }
    });

  }

  private resetInput(): void {
    this.selectedFile = null;
    this.fileName = 'Aún no se ha seleccionado un archivo.';
    if(this.fileInput) this.fileInput.nativeElement.value = '';
  }

}
