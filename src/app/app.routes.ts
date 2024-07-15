import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./pages/main/main.component').then((m) => m.MainComponent),
  // },

  {
    path: 'publish',
    loadComponent: () =>
      import('./pages/publish-post-page/publish-post-page.component').then(
        (m) => m.PublishPostPageComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-posts-page/search-posts-page.component').then(
        (m) => m.SearchPostsPageComponent
      ),
  },

  // Add other routes here
];
