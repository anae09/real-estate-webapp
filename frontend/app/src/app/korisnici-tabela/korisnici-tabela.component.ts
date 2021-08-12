import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../modeli/korisnik';

@Component({
  selector: 'app-korisnici-tabela',
  templateUrl: './korisnici-tabela.component.html',
  styleUrls: ['./korisnici-tabela.component.css']
})
export class KorisniciTabelaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService) {
    korisnikServis.dohvatiSve().subscribe((korisnici)=> {
      this.korisnici = korisnici;
    })
  }

  ngOnInit(): void {
  }

  korisnici: Korisnik[];

  obrisiKorisnika(korime: string) {
    this.korisnikServis.obrisiKorisnika(korime).subscribe((odgovor)=> {
      console.log(odgovor.poruka);
      this.korisnici = this.korisnici.filter(k => k.korime !== korime);
    })
  }

  odobriKorisnika(korime:string, tip: string) {
    this.korisnikServis.odobriKorisnika(korime, tip).subscribe((odgovor)=> {
      console.log(odgovor.poruka);
      let index = this.korisnici.findIndex(k => k.korime === korime);
      console.log(index);
      console.log(this.korisnici[index]);
      if (index > -1) {
        this.korisnici[index].status = tip;
      }
    })
  }

}
