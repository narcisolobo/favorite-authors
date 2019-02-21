import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  public errors: any = [];
  public authorToEdit: any;

  ngOnInit() {
    this.authorToEdit = { name: '' };
    this._route.params.subscribe((params: Params) => {
      this.selectAuthor(params['id']);
    });
  }

  public selectAuthor(id: string): void {
    this._http.getAuthor(id).subscribe(response => {
      if (response['message'] == 'Error') {
        this.errors = response['error'];
      }
      else {
        this.authorToEdit = response['data'];
      }
    });
  }

  public goHome() {
    this._router.navigate(['']);
  }

  public editAuthor(id: string, author: any) {
    if (author.name == ''){
      this.errors = 'Please enter a name.'
    }
    else {
      this._http.editAuthor(id, author).subscribe(response => {
        if (response['message'] === 'Error') {
          this.errors = response['error']['errors']['name']['message'];
        }
        else {
          this.goHome();
        }
      });
    }
  }

}