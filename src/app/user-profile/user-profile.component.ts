import { Component, OnInit } from '@angular/core';
//API
import { FetchApiDataService } from '../fetch-api-data.service';
//Component
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
//Material design
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initialize the component loading the data
   * @function ngOnInit
   */
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  openEditProfileDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '300px'
    })
  }

  deleteProfile(): void {
    if (confirm('Do you really want to delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}