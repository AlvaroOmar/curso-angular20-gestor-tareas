import { Component, ElementRef, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  inputTarea = viewChild<ElementRef<HTMLInputElement>>('inputTarea');
  agregado = output<string>();

  agregarTarea() {
    const input = this.inputTarea()?.nativeElement;
    if (input?.value.trim()) {
      this.agregado.emit(input.value);
      input.value = '';
    }
  }

  onKeyUpEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.agregarTarea();
    }
  }
}
