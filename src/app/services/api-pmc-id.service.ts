import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiPmcIdService {

  constructor(private http: HttpClient) { }
  public fetchData(id: string): Observable<any> {
    let url = 'http://83.220.174.161:9202/pmc/article/' + id;
    return this.http.get(url);
  }
}
