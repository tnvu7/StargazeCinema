import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieDetail } from 'src/app/models/moviedetails.model';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.page.html',
  styleUrls: ['./watchlater.page.scss'],
})
export class WatchlaterPage implements OnInit {

  movies: MovieDetail[] = [];
  constructor(private dbService: DbService, private route: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.dbService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.dbService.getMovies().subscribe(movies => {
          this.movies = movies;
        });
      }
    });
  }
  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: msg,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.dbService.deleteTable();
            this.movies = [];
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
 
  deleteTable(){
    this.createAlert("Are you sure you want to delete the all Movies?");

  }
  

}
