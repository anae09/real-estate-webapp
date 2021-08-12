import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcenatService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  dohvatiProcenat() {
    return this.http.get<[{prodaja: number, izdavanje:number}]>(`${this.uri}/procenat/dohvatiProcenat`);
  }

  postaviProcenat(prodaja: number, izdavanje: number) {
    const podaci = {
      prodaja: prodaja,
      izdavanje: izdavanje
    }
    return this.http.post<{poruka: string}>(`${this.uri}/procenat/postaviProcenat`, podaci);
  }
}
