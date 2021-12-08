import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlaterPageRoutingModule } from './watchlater-routing.module';

import { WatchlaterPage } from './watchlater.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlaterPageRoutingModule
  ],
  declarations: [WatchlaterPage]
})
export class WatchlaterPageModule {}
