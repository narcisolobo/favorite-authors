import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _http: HttpService ) { }

  public errors: any = [];
  public authors: any = [];

  ngOnInit() {
    this.getAllAuthors();
  }

  public getAllAuthors(): void {
    this._http.getAuthors().subscribe(response => {
      this.authors = response['data'];
      this.authors.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    });
  }

  public deleteAuthor(id: string) {
    this._http.deleteAuthor(id).subscribe(response => {
      if (response['message'] == 'Error') {
        this.errors = response['error'];
      }
      else {
        this.authors = response['data'];
      }
    });
  }

}