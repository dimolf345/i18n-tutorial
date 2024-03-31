import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Cake } from '../models/cake';
import { environment } from '../../environments/environment';
import { mockCakes } from '../models/mockData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #API_URL = environment.API_URL;

  getProducts(online: boolean = false): Observable<Cake[]> {
    const apiCall = online
      ? this.#http.get<Cake[]>(this.#API_URL)
      : of(mockCakes);

    const simulatedDelay = online ? 0 : 0;

    return apiCall.pipe(
      delay(simulatedDelay),
      map((cakes) =>
        cakes.map(
          (cake) =>
            ({
              ...cake,
              ingredients: cake.ingredients.split(','),
            } as Cake)
        )
      )
    );
  }
}
