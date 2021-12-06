import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = '6a8d1ed9';
fullurl = "";
  constructor(private http: HttpClient) { 
    //this.fullurl = `${this.url}?s=${encodeURI("avengers")}&type=movie&apikey=${this.apiKey}`;
    //console.log(this.fullurl);
  }

  searchData(title: string):  Observable<any> {
    console.log(title);
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=movie&apikey=${this.apiKey}`).
    pipe(
      map(data => data['Search']));
    
  }
  getDetails(id: string) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
