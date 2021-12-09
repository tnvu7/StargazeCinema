import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDetail } from 'src/app/models/moviedetails.model';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-watchlater',
  templateUrl: './watchlater.page.html',
  styleUrls: ['./watchlater.page.scss'],
})
export class WatchlaterPage implements OnInit {

  movies: MovieDetail[] = [];
  constructor(private dbService: DbService, private route: Router) { }

  ngOnInit() {
    this.dbService.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.dbService.getMovies().subscribe(movies => {
          this.movies = movies;
        });
      }
    });
  }
  deleteTable(){
    this.dbService.deleteTable();
  }
  

}
