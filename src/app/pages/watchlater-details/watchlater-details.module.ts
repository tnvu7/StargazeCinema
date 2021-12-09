import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlaterDetailsPageRoutingModule } from './watchlater-details-routing.module';

import { WatchlaterDetailsPage } from './watchlater-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlaterDetailsPageRoutingModule
  ],
  declarations: [WatchlaterDetailsPage]
})
export class WatchlaterDetailsPageModule {}
