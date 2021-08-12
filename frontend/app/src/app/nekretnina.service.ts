import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './modeli/korisnik';
import { Nekretnina } from './modeli/nekretnina';

@Injectable({
  providedIn: 'root',
})
export class NekretninaService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  dohvatiSveNekretnine() {
    return this.http.get<Nekretnina[]>(`${this.uri}/nekretnine/dohvatiSve`);
  }

  izmeniVlasnika(staroKorime: string, novoKorime: string) {
    const podaci = {
      staroKorime: staroKorime,
      novoKorime: novoKorime
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/izmeniVlasnika`, podaci)
  }

  izmeniKupca(staroKorime: string, novoKorime: string) {
    const podaci = {
      staroKorime: staroKorime,
      novoKorime: novoKorime
    }
    return this.http.post<{poruka:string}>(`${this.uri}/nekretnine/izmeniKupca`, podaci)
  }

  dohvatiNekretnineVlasnika(vlasnik: string) {
    const podaci = {
      vlasnik: vlasnik
    }
    return this.http.post<{poruka: string, nekretnine: Nekretnina[]}>(`${this.uri}/nekretnine/dohvatiNekretnineVlasnika`, podaci);
  }

  pretraga(grad: string, cenaOd: number, cenaDo: number) {
    const podaci = {
      grad: grad,
      cenaOd: cenaOd,
      cenaDo: cenaDo,
    };
    console.log(podaci);
    return this.http.post(`${this.uri}/nekretnine/pretragaNekretnina`, podaci);
  }

  dohvatiNekretninu(_id: string) {
    console.log(_id);
    const podaci = {
      _id: _id,
    };
    return this.http.post<{ poruka: string; nekretnina: Nekretnina }>(
      `${this.uri}/nekretnine/dohvatiNekretninu`,
      podaci
    );
  }

  ukloniNekretninu(_id: string) {
    console.log(_id);
    const podaci = {
      _id: _id,
    };
    return this.http.post<{ poruka: string}>(
      `${this.uri}/nekretnine/ukloniNekretninu`,
      podaci
    );
  }

  dodajNekretninu(
    naziv: string,
    adresa: string,
    grad: string,
    opstina: string,
    kategorija: string,
    brojSpratova: string,
    brojSprata: string,
    kvadratura: string,
    brojSoba: string,
    imaNamestaj: string,
    transakcija: string,
    media: File[],
    cena: string,
    vlasnik: string
  ) {
    const podaci = new FormData();
    podaci.append('naziv', naziv);
    podaci.append('adresa', adresa);
    podaci.append('grad', grad);
    podaci.append('opstina', opstina);
    podaci.append('kategorija', kategorija);
    podaci.append('brojSpratova', brojSpratova);
    podaci.append('brojSprata', brojSprata);
    podaci.append('kvadratura', kvadratura);
    podaci.append('brojSoba', brojSoba);
    podaci.append('transakcija', transakcija);
    podaci.append('imaNamestaj', imaNamestaj);
    podaci.append('cena', cena);
    podaci.append('vlasnik', vlasnik);
    for (var i = 0; i < media.length; i++) {
      podaci.append('media', media[i], media[i].name);
    }
    //console.log(podaci);
    return this.http.post<{poruka: string, images: string[], video: string[]}>(`${this.uri}/nekretnine/dodajNekretninu`, podaci);
  }

  azurirajNekretninu(
    _id: string,
    naziv: string,
    adresa: string,
    grad: string,
    opstina: string,
    kategorija: string,
    brojSpratova: string,
    brojSprata: string,
    kvadratura: string,
    brojSoba: string,
    imaNamestaj: string,
    transakcija: string,
    cena: string,
    vlasnik: string
  ) {
    const podaci = {
      _id: _id,
      naziv: naziv,
      adresa: adresa,
      grad: grad,
      opstina: opstina,
      kategorija: kategorija,
      brojSpratova: brojSpratova,
      brojSprata: brojSprata,
      brojSoba: brojSoba,
      kvadratura: kvadratura,
      imaNamestaj: imaNamestaj,
      transakcija: transakcija,
      cena: cena,
      vlasnik: vlasnik
    };

    //console.log(podaci);
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/azurirajNekretninu`, podaci);
  }

  dodajFajlove(id: string, media: File[]) {
    const podaci = new FormData();
    podaci.append("_id", id);
    for (var i = 0; i < media.length; i++) {
      podaci.append('media', media[i], media[i].name);
    }
    return this.http.post<{poruka: string, images: string[], video: string[]}>(`${this.uri}/nekretnine/dodajFajlove`, podaci);
  }

  promovisiNekretninu(id: string) {
    const podaci = {
      _id : id,
      promocija: true
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/promocijaNekretnine`, podaci);
  }

  ukloniPromociju(id: string) {
    const podaci = {
      _id : id,
      promocija: false
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/promocijaNekretnine`, podaci);
  }

  odobriNekretninu(id: string) {
    const podaci = {
      _id : id,
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/odobriNekretninu`, podaci);
  }

  ukloniSliku(_id: string, slika: string) {
    const podaci = {
      _id: _id,
      imagePath: slika
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/ukloniSliku`, podaci);
  }

  ukloniVideo(_id: string, video: string) {
    const podaci = {
      _id: _id,
      videoPath: video
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/ukloniVideo`, podaci);
  }

  prihvatiPonudu(_id: string, id: string, kupac: string) {
    const podaci = {
      _id: _id,
      id: id,
      kupac: kupac
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/prihvatiPonudu`, podaci);
  }

  ukloniPonudu(_id: string, id: string) {
    const podaci = {
      _id: _id,
      id: id
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/ukloniPonudu`, podaci);
  }

  potvrdiKupovinu(_id: string, id: string) {
    const podaci = {
      _id: _id,
      id: id
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/potvrdiKupovinu`, podaci);
  }

  potvrdiIzdavanje(_id: string, id: string, datumOd: Date, datumDo: Date) {
    const podaci = {
      _id: _id,
      id: id,
      datumOd: datumOd,
      datumDo: datumDo
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/potvrdiIzdavanje`, podaci);
  }

  odbijPonudu(_id: string, id: string) {
    const podaci = {
      _id: _id,
      id: id
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/odbijPonudu`, podaci);
  }

  napraviPonudu(_id: string, placanje: string, kupac: string, datumOd: Date, datumDo: Date) {
    const podaci = {
      _id: _id,
      placanje: placanje,
      kupac: kupac,
      datumOd: datumOd,
      datumDo: datumDo
    }
    return this.http.post<{poruka: string}>(`${this.uri}/nekretnine/napraviPonudu`, podaci);
  }

  brojNekretninaPoGradu() {
    return this.http.get<[{_id: string, ukupno: number}]>(`${this.uri}/nekretnine/brojNekretninaPoGradu`);
  }

  stanoviPodaci() {
    return this.http.get<[{_id: string, ukupno: number}]>(`${this.uri}/nekretnine/stanoviPodaci`);
  }

  kucePodaci() {
    return this.http.get<[{_id: string, ukupno: number}]>(`${this.uri}/nekretnine/kucePodaci`);
  }

  cenovniRang(cenaOd: number, cenaDo: number) {
    const podaci = {
      cenaOd: cenaOd,
      cenaDo: cenaDo
    }
    return this.http.post<[{ukupno: number}]>(`${this.uri}/nekretnine/cenovniRang`, podaci);
  }

  dohvatiPromovisane() {
    return this.http.get<Nekretnina[]>(`${this.uri}/nekretnine/dohvatiPromovisane`);
  }

}
