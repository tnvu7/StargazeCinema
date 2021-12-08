import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
      },
      
      {
        path: 'moviedetails/:id',
        loadChildren: () => import('../pages/moviedetails/moviedetails.module').then( m => m.MoviedetailsPageModule)
      },
      {
        path: 'watchlater',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/watchlater/watchlater.module').then( m => m.WatchlaterPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/watchlater-details/watchlater-details.module').then( m => m.WatchlaterDetailsPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
