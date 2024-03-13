import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPmcService {

  constructor(private http: HttpClient) { }
  public fetchData(search_text: string, filter_quartile: number = 0, filter_country: string = '', size: number = 20, page: number = 0): Observable<any> {
    let url = 'http://83.220.174.161:9202/pmc/articles/' + search_text + '?filter_quartile=' + filter_quartile + '&filter_country=' + filter_country +
      '&size=' + size + '&page=' + page;
    return this.http.get(url);
  }
}
