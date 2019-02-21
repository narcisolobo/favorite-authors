import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  private _rootURL: string = 'http://localhost:8000/authors/';

  public author: any;

  getAuthors(){
    return this._http.get(this._rootURL);
  }

  getAuthor(id: string){
    return this._http.get(this._rootURL + id);
  }

  addAuthor(newAuthor: any){
    return this._http.post(this._rootURL, newAuthor);
  }

  deleteAuthor(id: string){
    return this._http.delete(this._rootURL + id);
  }

  editAuthor(id: string, author: any){
    return this._http.put(this._rootURL + id, author);
  }
}
