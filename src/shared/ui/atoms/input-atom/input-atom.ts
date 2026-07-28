import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-atom',
  standalone: true,
  imports: [],
  templateUrl: './input-atom.html',
  styleUrl: './input-atom.css',
})
export class InputAtom {
  value = input('');
  placeholder = input('');

  valueChange = output<string>();
  enterPressed = output<void>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
