import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { Location } from '@angular/common'
import { DbService } from 'src/app/service/db.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.page.html',
  styleUrls: ['./moviedetails.page.scss'],
})
export class MoviedetailsPage implements OnInit {
  movieInfo: any;
  private urlHistory: string[] = []

  constructor(private activatedRoute: ActivatedRoute, public movieService: MovieService, 
    private location: Location, private router: Router, private db: DbService, private alertController: AlertController) { 
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.urlHistory.push(event.urlAfterRedirects)
        }
      })
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getDetails(id).subscribe(data => this.movieInfo = data);
  }
  nav() {
    this.urlHistory.pop();
    this.location.back();
  }
  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  AddToList(){
    console.log(this.movieInfo);
    this.db.addMovie(this.movieInfo.imdbID, this.movieInfo.Title, this.movieInfo.Year, this.movieInfo.Type, 
      this.movieInfo.Poster, this.movieInfo.Runtime, this.movieInfo.Released, this.movieInfo.Genre, 
      this.movieInfo.Plot, this.movieInfo.imdbRating, this.movieInfo.Rated);
    this.createAlert("Added movie!");
  }
}
