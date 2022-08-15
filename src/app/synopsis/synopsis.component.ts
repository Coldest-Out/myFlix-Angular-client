import { Component, OnInit, Inject } from '@angular/core';

// Angular Material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent implements OnInit {
  /**
     * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
     * The data can be accessed to populate the view.
     * @param data
     */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}