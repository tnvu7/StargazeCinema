import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieDetail } from '../models/moviedetails.model';

// export enum SearchType {
//   all = '',
//   movie = 'movie',
//   series = 'series',
//   episode = 'episode'
// }
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = '6a8d1ed9';

  movies: MovieDetail[] = [];
  constructor(private http: HttpClient) { }

  searchData(title: string){
    console.log(`${this.url}?s=${encodeURI(title)}&type=movie&apikey=${this.apiKey}`);
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=movie&apikey=${this.apiKey}`).
    pipe(
      map(data => {
        let movies: MovieDetail[] = [];
        let array = data['Search'];

        if (!array) return null;
        array.forEach(mov => {
          movies.push(new MovieDetail(mov['imdbID'], mov['Title'], mov['Year'], mov['Type'], mov['Poster'], 
          mov['Runtime'], mov['Released'], mov['Genre'], mov['Plot'], mov['imdbRating'], mov['Rated']));
        });
        this.movies = movies;
        return [...this.movies];
      })
    );
  }
  getDetails(id: string) {
    console.log(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
