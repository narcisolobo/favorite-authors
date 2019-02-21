import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  constructor(
    private _title: Title
  ){}

  public errors: any = [];

  ngOnInit(){
    this.setTitle('Favorite Authors');
  }

  public setTitle( newTitle: string) {
    this._title.setTitle( newTitle );
  }

}