import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
