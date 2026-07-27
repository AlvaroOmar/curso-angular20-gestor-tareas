import { Component, input, output } from '@angular/core';
import { Task } from '../../../task';


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();
  toggle = output<number>(); // Emitir un evento actualice al padre
  removed = output<number>(); // Emitir un evento actualice al padre
}
