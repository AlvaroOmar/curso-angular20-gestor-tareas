import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Gestor de tareas';
  pageSizeOptions = [5, 10, 20, 30];

  tareas = signal<Task[]>(this.crearTareasIniciales());
  currentPage = signal(1);
  pageSize = signal(5);

  totalPaginas = computed(() => {
    const total = Math.ceil(this.tareas().length / this.pageSize());
    return total === 0 ? 1 : total;
  });

  tareasVisibles = computed(() => {
    const inicio = (this.currentPage() - 1) * this.pageSize();
    return this.tareas().slice(inicio, inicio + this.pageSize());
  });

  pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);

  private crearTareasIniciales(): Task[] {
    return Array.from({ length: 30 }, (_, index) => {
      const numero = index + 1;
      return {
        id: numero,
        titulo: `Tarea ${numero}`,
        completada: numero % 4 === 0,
      };
    });
  }

  paginaAnterior(): void {
    this.currentPage.update((actual) => Math.max(actual - 1, 1));
  }

  paginaSiguiente(): void {
    this.currentPage.update((actual) => Math.min(actual + 1, this.totalPaginas()));
  }

  cambiarTamanoPagina(valor: string): void {
    const nuevoTamano = Number(valor);
    if (!Number.isFinite(nuevoTamano) || nuevoTamano <= 0) {
      return;
    }

    this.pageSize.set(nuevoTamano);
    this.currentPage.set(1);
  }

  private ajustarPaginaActual(): void {
    this.currentPage.update((actual) => Math.min(actual, this.totalPaginas()));
  }

  agregar(titulo: string): void {
    const limpio = titulo.trim();
    if (!limpio) {
      return;
    }

    this.tareas.update((lista) => [
      ...lista,
      { id: Date.now(), titulo: limpio, completada: false },
    ]);

    this.ajustarPaginaActual();
  }

  eliminar(id: number): void {
    this.tareas.update((lista) => lista.filter((t) => t.id !== id));
    this.ajustarPaginaActual();
  }

  toggle(id: number): void {
    this.tareas.update((lista) =>
      lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
    );
  }
}
