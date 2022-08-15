import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cold-myflix-app.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * @service POST to an API endpoint to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @service POST to an API endpoint to log a user in
   * @param {any} userDetails - Username and password
   * @returns user data in json format
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * @service GET to an API endpoint to get all movies
   * @returns array of movies in json format
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Retrieve singel Movie Enpoint (GET)
  getMovie(title: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET to an API endpoint to get data about directors
   * @returns an array of directors in json format
   * @function getDirector
   */
  getDirector(name: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET to an API  endpoint to get data about genres
   * @returns an array of genres in json format
   * @function getGenre
   */
  getGenre(title: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/genre/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service GET to an API endpoint to get data about a specific user
   * @returns a user in json format
   * @function getUser
   */
  getUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service PUT to an API endpoint to add a movie to the favourite list array
   * @param {string} movieID
   * @returns a user in json format
   * @function addFavoriteMovie
   */
  addFavoriteMovie(movieID: string): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service DELETE to an API endpoint to remove a movie to the favourite list array
   * @param {any} movieID
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(movieID: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service PUT to an API endpoint to update one or multiple data of a user
   * @param {any} updateDetails
   * @returns a user in json format
   * @function editUser
   */
  editUser(updateDetails: any): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * @service DELETE to an API endpoint to remove a user
   * @returns a user in json format
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Manage non typed data responses
   * @returns {any} body || {}
   * @function extractResponseData
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handle function
   * @param {HttpErrorResponse} error
   * @function handleError
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}