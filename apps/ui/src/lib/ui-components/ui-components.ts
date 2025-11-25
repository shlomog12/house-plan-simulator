import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-ui-components',
  imports: [],
  templateUrl: './ui-components.html',
  styleUrl: './ui-components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponents {}
