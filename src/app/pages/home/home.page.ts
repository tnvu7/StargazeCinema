import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchType, MovieService } from 'src/app/service/movie.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  results: Observable<any>;
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
      this.results = this.movieService.searchData(query);
      console.log(this.results);
    }
  }
}
