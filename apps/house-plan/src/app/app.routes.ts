import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadChildren: () =>
      import('@house-plan/home-page').then(
        (m) => m.homePageRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new-project',
    loadComponent: () =>
      import('@house-plan/new-project-form').then(
        (m) => m.NewProjectForm
      ),
    title: 'יצירת פרויקט חדש',
  },
];