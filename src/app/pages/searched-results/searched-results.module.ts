import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchedResultsPageRoutingModule } from './searched-results-routing.module';

import { SearchedResultsPage } from './searched-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchedResultsPageRoutingModule
  ],
  declarations: [SearchedResultsPage]
})
export class SearchedResultsPageModule {}
