import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './modeli/korisnik';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  constructor(private http: HttpClient) {}

  uri = 'http://localhost:4000';

  dodajKorisnika(
    ime: string,
    prezime: string,
    korime: string,
    email: string,
    lozinka: string,
    grad: string,
    drzava: string,
    tip: string,
    profilna: File
  ) {
    const podaci = new FormData();
    podaci.append('ime', ime);
    podaci.append('prezime', prezime);
    podaci.append('korime', korime);
    podaci.append('email', email);
    podaci.append('lozinka', lozinka);
    podaci.append('grad', grad);
    podaci.append('drzava', drzava);
    podaci.append('tip', tip);
    if (profilna) {
      podaci.append('image', profilna, korime);
    }
    return this.http.post<{ poruka: string; korisnik: Korisnik }>(
      `${this.uri}/korisnici/dodajKorisnika`,
      podaci
    );
  }

  izmeniKorisnika(
    _id: string,
    ime: string,
    prezime: string,
    korime: string,
    email: string,
    grad: string,
    drzava: string
  ) {
    const podaci = {
      "_id": _id,
      "ime": ime,
      "prezime": prezime,
      "korime": korime,
      "email": email,
      "grad": grad,
      "drzava": drzava
    }
    return this.http.post<{ poruka: string; korisnik: Korisnik }>(
      `${this.uri}/korisnici/izmeniKorisnika`,
      podaci
    );
  }

  dohvatiKorisnika(korime: string, lozinka: string) {
    const podaci = {
      korime: korime,
      lozinka: lozinka,
    };
    return this.http.post<Korisnik>(
      `${this.uri}/korisnici/dohvatiKorisnika`,
      podaci
    );
  }

  dohvatiKorisnikaKorime(korime: string) {
    const podaci = {
      korime: korime,
    };
    return this.http.post<Korisnik>(
      `${this.uri}/korisnici/dohvatiKorisnikaKorime`,
      podaci
    );
  }

  dohvatiSve() {
    return this.http.get<Korisnik[]>(`${this.uri}/korisnici/dohvatiSve`);
  }

  obrisiKorisnika(korime: string) {
    const podaci = {
      korime: korime,
    };
    return this.http.post<{ poruka: string }>(
      `${this.uri}/korisnici/obrisiKorisnika`,
      podaci
    );
  }

  odobriKorisnika(korime: string, tip: string) {
    const podaci = {
      korime: korime,
      tip: tip,
    };
    return this.http.post<{ poruka: string }>(
      `${this.uri}/korisnici/odobriKorisnika`,
      podaci
    );
  }

  izmeniSliku(korime: string, profilna: File) {
    console.log(korime, profilna);
    const podaci = new FormData();
    podaci.append('korime', korime);
    if (profilna) {
      podaci.append('image', profilna, korime);
    }
    return this.http.post<{ poruka: string, profilnaPath: string }>(
      `${this.uri}/korisnici/promeniSliku`,
      podaci
    );
  }

  izmeniSifru(korime: string, lozinka: string) {
    const podaci = {
      korime: korime,
      lozinka: lozinka
    }
    return this.http.post<{ poruka: string }>(
      `${this.uri}/korisnici/promeniSifru`,
      podaci
    );
  }
}
