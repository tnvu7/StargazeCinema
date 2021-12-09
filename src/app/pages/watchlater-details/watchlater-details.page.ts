import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Location } from '@angular/common'
import { DbService } from 'src/app/service/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-watchlater-details',
  templateUrl: './watchlater-details.page.html',
  styleUrls: ['./watchlater-details.page.scss'],
})
export class WatchlaterDetailsPage implements OnInit {
  movieInfo: any;
  isLoading = true;
  private urlHistory: string[] = [];


  constructor(private activatedRoute: ActivatedRoute, public movieService: MovieService, 
    private location: Location, private router: Router, private db: DbService, private alertController: AlertController) { 
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.urlHistory.push(event.urlAfterRedirects)
        }
      })
    }

  ngOnInit() {
    console.log('Inside watchLater Details')
  }
  nav() {
    console.log("Go back from WatchLater Details");
    this.urlHistory.pop();
    this.location.back();
  }
  ionViewWillEnter() {
    this.db.getMovieById(this.activatedRoute.snapshot.params['id']).then(mov => {
      if(mov)
      this.movieInfo = mov;
    }).then(() => {
      this.isLoading = false;
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
            this.db.deleteMovieById(this.movieInfo.imdbID).then(() => {
              this.router.navigate(['/tabs/watchlater']);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
  deleteMovie() {
    console.log(this.movieInfo.imdbID);
    this.createAlert("Are you sure you want to delete the movie?");
  }
}
