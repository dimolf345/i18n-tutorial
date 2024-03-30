import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cake } from '../models/cake';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #API_URL = environment.API_URL;

  getProducts(): Observable<Cake[]> {
    return this.#http.get<Cake[]>(this.#API_URL);
  }
}
