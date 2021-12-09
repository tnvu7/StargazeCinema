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
        loadChildren: () => import('../pages/watchlater/watchlater.module').then( m => m.WatchlaterPageModule)
      },
      {
        path: 'searched-results',
        loadChildren: () => import('../pages/searched-results/searched-results.module').then( m => m.SearchedResultsPageModule)
      }
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
