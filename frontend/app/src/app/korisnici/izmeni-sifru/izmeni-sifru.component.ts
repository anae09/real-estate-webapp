import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Korisnik } from 'src/app/modeli/korisnik';

@Component({
  selector: 'app-izmeni-sifru',
  templateUrl: './izmeni-sifru.component.html',
  styleUrls: ['./izmeni-sifru.component.css']
})
export class IzmeniSifruComponent implements OnInit {

  constructor(private ruter: Router,
    private ruta: ActivatedRoute,
    private korisnikServis: KorisnikService) { }

  ulogovan: Korisnik;

  ngOnInit(): void {
    if (!localStorage.getItem("korisnik")) {
      this.ruter.navigateByUrl('');
    }
    this.ulogovan = JSON.parse(localStorage.getItem("korisnik"));
    this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('username')) {
        this.korisnikServis
          .dohvatiKorisnikaKorime(paramMap.get('username'))
          .subscribe((k: Korisnik) => {
            console.log(k);
            this.korisnik = k;
            console.log(this.korisnik);
            this.form = new FormGroup({
              staraLozinka: new FormControl(null, {
                validators: [Validators.required],
              }),
              lozinka: new FormControl(null, {
                validators: [Validators.required],
              }),
              ponovljenaLozinka: new FormControl(null, {
                validators: [Validators.required],
              })
            });
          });
      } else {
        this.ruter.navigateByUrl('/');
      }
    });
  }

  form: FormGroup;
  poruka: string = '';
  korisnik: Korisnik;

  proveriLozinku():boolean {
    let lozinka = this.form.get('lozinka').value;
    var regLozinka = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,24})', 'g');
    if (!regLozinka.test(lozinka)) return false;
    var regUzastopni = /([a-z])\1{2,}/ig;
    return !(regUzastopni.test(lozinka));
  }

  izmeniSifru() {
    console.log("promena sifre");
    if (!this.form.valid) return;
    console.log("forma validna");
    if (
      this.form.get('staraLozinka').value !== this.korisnik.lozinka ||
      this.form.get('lozinka').value !==
      this.form.get('ponovljenaLozinka').value
    ) {
      this.poruka = 'Lozinka neispravna! Pokusajte ponovo';
      return;
    }

    if (!this.proveriLozinku()) {
      this.poruka = 'Lozinka ne ispunjava zahteve! Pokusajte ponovo';
      return;
    }

    this.korisnikServis.izmeniSifru(this.korisnik.korime, this.form.get('lozinka').value)
    .subscribe(odgovor=> {
      console.log(odgovor.poruka);
      if (this.korisnik.korime == this.ulogovan.korime) {
        localStorage.clear();
        this.ruter.navigateByUrl('/');
      } else { // admin
        this.ruter.navigateByUrl("/admin/korisnici");
      }

    })
  }

}
