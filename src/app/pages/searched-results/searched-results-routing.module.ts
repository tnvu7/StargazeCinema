import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchedResultsPage } from './searched-results.page';

const routes: Routes = [
  {
    path: '',
    component: SearchedResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchedResultsPageRoutingModule {}
