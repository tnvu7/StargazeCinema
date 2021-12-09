import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieDetail } from '../../models/moviedetails.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-searched-results',
  templateUrl: './searched-results.page.html',
  styleUrls: ['./searched-results.page.scss'],
})
export class SearchedResultsPage implements OnInit {

  results: MovieDetail[] = [];
  isLoaded = false;
  constructor(private movieService: MovieService, private route: ActivatedRoute, 
    private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }
  async createAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
  getMovies(query: string){
    if (query == ''){
      this.createAlert("Please enter a movie title");
    } else {
      this.movieService.searchData(query).subscribe(val => {
        if (val == null){
          this.createAlert("Movie is not found.");
        }
        this.isLoaded = true;
        console.log(val);
        this.results = val;
      });
    }
  }
}
