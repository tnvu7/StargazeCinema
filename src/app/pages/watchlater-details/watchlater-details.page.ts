import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieDetail } from 'src/app/models/moviedetails.model';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-watchlater-details',
  templateUrl: './watchlater-details.page.html',
  styleUrls: ['./watchlater-details.page.scss'],
})
export class WatchlaterDetailsPage implements OnInit {

  movie: MovieDetail;
  isLoading = true;
  constructor(private route: ActivatedRoute, private dbService: DbService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.dbService.getMovieById(this.route.snapshot.params['id']).then(movie => {
      if (movie){
        this.movie = movie;
      }
    }).then(() => {
      this.isLoading = false;
    })
  }
}
