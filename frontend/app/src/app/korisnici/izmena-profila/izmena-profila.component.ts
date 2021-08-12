import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Korisnik } from 'src/app/modeli/korisnik';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-izmena-profila',
  templateUrl: './izmena-profila.component.html',
  styleUrls: ['./izmena-profila.component.css'],
})
export class IzmenaProfilaComponent implements OnInit {
  constructor(
    private ruter: Router,
    private ruta: ActivatedRoute,
    private korisnikServis: KorisnikService,
    private nekretnineServis: NekretninaService
  ) {}

  form: FormGroup;
  poruka: string = '';
  korisnik: Korisnik;
  staroKorime:string = '';

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('username')) {
        this.korisnikServis
          .dohvatiKorisnikaKorime(paramMap.get('username'))
          .subscribe((k: Korisnik) => {
            console.log(k);
            this.korisnik = k;
            this.staroKorime = k.korime;
            //console.log(this.korisnik);
            this.form = new FormGroup({
              ime: new FormControl(this.korisnik.ime, {
                validators: [Validators.required],
              }),
              prezime: new FormControl(this.korisnik.prezime, {
                validators: [Validators.required],
              }),
              email: new FormControl(this.korisnik.email, {
                validators: [Validators.required, Validators.email],
              }),
              korime: new FormControl(this.korisnik.korime, {
                validators: [Validators.required],
              }),
              grad: new FormControl(this.korisnik.grad, {
                validators: [Validators.required],
              }),
              drzava: new FormControl(this.korisnik.drzava, {
                validators: [Validators.required],
              })
              // tip: new FormControl('korisnik', {
              //   validators: [Validators.required],
              // }),
            });
          });
      } else {
        this.ruter.navigateByUrl('/');
      }
    });
  }

  izmeniKorisnika() {
    this.poruka = '';
    if (this.form.invalid) {
      return;
    }
    console.log("Forma", this.form);

    this.korisnikServis.izmeniKorisnika(
        this.korisnik._id,
        this.form.get('ime').value,
        this.form.get('prezime').value,
        this.form.get('korime').value,
        this.form.get('email').value,
        this.form.get('grad').value,
        this.form.get('drzava').value
        ).subscribe( odgovor => {
          console.log("poruka", odgovor.poruka);
          this.poruka = odgovor.poruka;
          console.log(odgovor.korisnik);
          if (this.poruka === "Korisnik uspesno azuriran") {
            if (this.staroKorime !== this.form.get('korime').value && this.korisnik.tip !== 'agent') {
              this.nekretnineServis.izmeniVlasnika(this.staroKorime, this.form.get('korime').value).subscribe(odg=>{
                console.log(odgovor);
              });

              this.nekretnineServis.izmeniKupca(this.staroKorime, this.form.get('korime').value).subscribe(odg=>{
                console.log(odgovor);
              });
            }

            let ulogovanKorisnik = JSON.parse(localStorage.getItem("korisnik"));
            console.log(this.ruta.snapshot.params.username)
            if (this.ruta.snapshot.params.username === ulogovanKorisnik.korime) {
              ulogovanKorisnik.ime = this.form.get('ime').value;
              ulogovanKorisnik.prezime = this.form.get('prezime').value;
              ulogovanKorisnik.korime = this.form.get('korime').value;
              ulogovanKorisnik.email = this.form.get('email').value;
              ulogovanKorisnik.grad = this.form.get('grad').value;
              ulogovanKorisnik.drzava = this.form.get('drzava').value;
              localStorage.setItem("korisnik", JSON.stringify(ulogovanKorisnik));
            } else { // admin
              this.ruter.navigateByUrl('/admin/korisnici')
            }
          }
        })
    //this.form.reset();
  }
}
