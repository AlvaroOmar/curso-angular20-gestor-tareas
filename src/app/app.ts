import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './features/Tasks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Gestor de tareas';

  protected readonly tasksService = inject(TasksService);
}
