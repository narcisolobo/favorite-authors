import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  public errors: any = [];
  public newAuthor: any;

  ngOnInit() {
    this.newAuthor = { name: '' };
  }

  public createAuthor(newAuthor: any) {
    this._http.addAuthor(newAuthor).subscribe(response => {
      if (response['message'] === 'Error') {
        this.errors = response['error']['errors']['name']['message'];
      }
      else {
        this.goHome();
      }
    });
  }

  public goHome() {
    this._router.navigate(['']);
  }

}
