import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { AlertController } from '@ionic/angular';
import { MovieDetail } from 'src/app/models/moviedetails.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  results: MovieDetail[] = [];
  constructor(private movieService: MovieService, public alertController: AlertController) { }

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
        console.log(val);
        this.results = val;
        
      }
        );
      //this.results = this.movieService.searchData(query);
      
    }
  }
}
