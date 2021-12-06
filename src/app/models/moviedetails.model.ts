import { Movie } from "./movie.model";

export class MovieDetail extends Movie {
 constructor (
    public Title: string,
    public Year: string,
    public imdbID: string,
    public Type: string,
    public Poster: string,

    public Runtime: string,
    public Released: string,
    public Genre: string,
    public Plot: string,
    public imdbRating: string,
    public Rated: string,
 ) {
     super(Title, Year, imdbID, Type, Poster);
 }
}