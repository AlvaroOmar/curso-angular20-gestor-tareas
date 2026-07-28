import { Component, output } from '@angular/core';
import { ButtonAtom } from '../atoms/button-atom/button-atom';
import { InputAtom } from '../atoms/input-atom/input-atom';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [InputAtom, ButtonAtom],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  titulo = '';
  agregado = output<string>();

  agregarTarea() {
    const limpio = this.titulo.trim();
    if (limpio) {
      this.agregado.emit(limpio);
      this.titulo = '';
    }
  }
}
