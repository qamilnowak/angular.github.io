import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Car} from './models/car';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CarsService {
private apiUrl = 'http://loopback-rest-api.herokuapp.com/api/cars';
  constructor(private http: Http) {
  }


  getCars(): Observable<Car[]> {
    return this.http.get(this.apiUrl)
      .map((res) => res.json());
  }

}
