import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../task';

@Injectable({ providedIn: 'root' })
export class TasksService {
	private readonly STORAGE_KEY = 'tasks-app-tareas';

	tareas = signal<Task[]>(this.cargarTareas());

	pendientes = computed(() => this.tareas().filter((t) => !t.completada).length);
	completadas = computed(() => this.tareas().filter((t) => t.completada).length);

	agregar(titulo: string): void {
		const limpio = titulo.trim();
		if (!limpio) {
			return;
		}

		this.tareas.update((lista) => [
			...lista,
			{ id: Date.now(), titulo: limpio, completada: false },
		]);
		this.guardarTareas();
	}

	eliminar(id: number): void {
		this.tareas.update((lista) => lista.filter((t) => t.id !== id));
		this.guardarTareas();
	}

	toggle(id: number): void {
		this.tareas.update((lista) =>
			lista.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)),
		);
		this.guardarTareas();
	}

	limpiarCompletadas(): void {
		this.tareas.update((lista) => lista.filter((t) => !t.completada));
		this.guardarTareas();
	}

	private cargarTareas(): Task[] {
		const tareasIniciales: Task[] = [
			{ id: 1, titulo: 'Aprender angular', completada: false },
			{ id: 2, titulo: 'Construir un proyecto nuevo', completada: false },
			{ id: 3, titulo: 'Dominar signals', completada: true },
		];

		if (typeof localStorage === 'undefined') {
			return tareasIniciales;
		}

		const guardadas = localStorage.getItem(this.STORAGE_KEY);
		if (!guardadas) {
			return tareasIniciales;
		}

		try {
			const parseadas = JSON.parse(guardadas) as Task[];
			return Array.isArray(parseadas) ? parseadas : tareasIniciales;
		} catch {
			return tareasIniciales;
		}
	}

	private guardarTareas(): void {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tareas()));
	}
}
