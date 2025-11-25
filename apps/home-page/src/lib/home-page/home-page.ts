import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {




  constructor(private router: Router) {}

  createNewProject() {
    this.router.navigate(['/new-project']);
  }
}
