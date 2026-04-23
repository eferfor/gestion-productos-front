import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table-entry',
  imports: [NgClass],
  templateUrl: './table-entry.html',
  styleUrl: './table-entry.css',
  standalone: true
})
export class TableEntry {
  disabled = input.required<boolean>();
  focusClass = input.required<boolean>();
  newClass = input<string>('');

  value = input<string>('');
  valueChange = output<string>();

}
