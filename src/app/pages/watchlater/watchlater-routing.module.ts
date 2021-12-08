import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchlaterPage } from './watchlater.page';

const routes: Routes = [
  {
    path: '',
    component: WatchlaterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlaterPageRoutingModule {}
