import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button-atom',
  imports: [],
  templateUrl: './button-atom.html',
  styleUrl: './button-atom.css',
})
export class ButtonAtom {
  label = input('');
  minWidth = input<string | null>(null);

  pressed = output<void>();
}
