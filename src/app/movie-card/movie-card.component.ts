// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
  /**
     * Gets all the movies using API service and populate local state variable
     * @returns array of movies objects
     * @function getMovies
     */

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens the genre dialog from GenreComponent
   * @param name: string[]
   * @function openGenreDialog
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        name,
        description,
      },
    });
  }

  /**
   * Opens the director dialog from DirectorComponent
   * @param name: string[]
   * @function openDirectorDialog
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio },
    });
  }

  /**
   * Opens the synopsys dialog from SynopsysComponent
   * @param title
   * @param description
   * @function openSynopsisDialog
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
    });
  }

  /**
   * Add a movie to the list of favorite movies using API service
   * @param id
   * @function addToFavoriteMovies
   */
  onToggleFavoriteMovie(id: string): any {
    if (this.isFav(id)) {
      this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favorites.indexOf(id);
      return this.favorites.splice(index, 1);
    } else {
      this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favorites.push(id);
  }

  /**
   * Checks if a movie is included in the user's list of favorite movies
   * @param id
   * @returns true if the movie is in the array
   * @function isFav
   */
  isFav(id: string): boolean {
    return this.favorites.includes(id)
  }

}