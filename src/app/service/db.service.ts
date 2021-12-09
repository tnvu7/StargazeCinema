import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-enterprise/secure-storage/ngx';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieDetail } from '../models/moviedetails.model';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  private databaseObj: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  movies = new BehaviorSubject([]);
  constructor(private sqlite: SQLite, private plt: Platform) { 
    this.plt.ready().then(()=> {
      this.createDBAndTables();
    });
  }

  private createDBAndTables() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.databaseObj = db;
      this.databaseObj.executeSql(`CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, imdbID TEXT, Title TEXT, 
        Year TEXT, Type TEXT, Poster TEXT, Runtime TEXT, Released TEXT, Genre TEXT, Plot TEXT, 
        imdbRating TEXT, Rated TEXT)`, []).then(() => {
            this.loadMovies();
            this.dbReady.next(true);
        })
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  getMovies(): Observable<MovieDetail[]> {
    return this.movies.asObservable();
  }
  loadMovies() {
    return this.databaseObj.executeSql(`SELECT * FROM movies`, []).then(res => {
      let movies: MovieDetail[] = [];
      console.log(res.rows.length);
      console.log(res);
      for (let i = 0; i<res.rows.length; i++){
        movies.push({
          id: res.rows.item(i).id,
          imdbID: res.rows.item(i).imdbID,
          Title: res.rows.item(i).Title,
          Year: res.rows.item(i).Year,
          Type: res.rows.item(i).Type,
          Poster: res.rows.item(i).Poster,
          Runtime: res.rows.item(i).Runtime,
          Released: res.rows.item(i).Released,
          Genre: res.rows.item(i).Genre,
          Plot: res.rows.item(i).Plot,
          imdbRating: res.rows.item(i).imdbRating,
          Rated: res.rows.item(i).Rated
        });
      }
      this.movies.next(movies);
      console.log('From database: ', res);
      console.log('After serialize: ', movies);
    }).catch(e => console.log(e));
  }

  addMovie(imdbID, Title, Year, Type, Poster, Runtime, Released, Genre, Plot, imdbRating, Rated) {
    let data = [imdbID, Title, Year, Type, Poster, Runtime, Released, Genre, Plot, imdbRating, Rated];
    return this.databaseObj.executeSql(`INSERT INTO movies(imdbID, Title, Year, Type, Poster, Runtime, Released, Genre, Plot, imdbRating, Rated) 
                                      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data).then(res => {
      this.loadMovies();
      console.log('Added Movies: ', res);
      console.log("Inserted Id: ", res.insertedId);
      return res.imdbID;
    }).catch(e => console.log(e));
  }

  getMovieById(id: string){
    return this.databaseObj.executeSql(`SELECT * FROM movies WHERE imdbID=?`, [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        imdbID: res.rows.item(0).imdbID,
          Title: res.rows.item(0).Title,
          Year: res.rows.item(0).Year,
          Type: res.rows.item(0).Type,
          Poster: res.rows.item(0).Poster,
          Runtime: res.rows.item(0).Runtime,
          Released: res.rows.item(0).Released,
          Genre: res.rows.item(0).Genre,
          Plot: res.rows.item(0).Plot,
          imdbRating: res.rows.item(0).imdbRating,
          Rated: res.rows.item(0).Rated
      }
    }).catch(e => console.log(e));
  }

  deleteMovieById(id: string){
    return this.databaseObj.executeSql(`DELETE FROM movies WHERE imdbID=?`, [id]).then(res => {
      this.loadMovies();
    }).catch(e => console.log(e));
  }

  deleteTable(){
    this.databaseObj.executeSql("DROP TABLE movies");
  }
}
