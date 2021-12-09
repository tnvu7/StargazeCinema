import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { AlertController, NavController } from '@ionic/angular';
import { MovieDetail } from 'src/app/models/moviedetails.model';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  results: Movie[] = [];
  constructor(private movieService: MovieService, public alertController: AlertController, private router: Router,
    public navCtrl: NavController) { }

  ngOnInit() {
    console.log("reinit");
    this.movieService.searchDefaultMovie().subscribe(val => {
      console.log(val);
      this.results = val;
    });
  }
   
}
