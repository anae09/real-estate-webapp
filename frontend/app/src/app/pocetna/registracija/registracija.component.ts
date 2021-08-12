import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
})
export class RegistracijaComponent implements OnInit {
  constructor(private korisnikServis: KorisnikService, private ruter: Router) {}

  form: FormGroup;
  poruka: string = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      ime: new FormControl(null, {
        validators: [Validators.required],
      }),
      prezime: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      korime: new FormControl(null, {
        validators: [Validators.required],
      }),
      lozinka: new FormControl(null, {
        validators: [Validators.required],
      }),
      ponovljenaLozinka: new FormControl(null, {
        validators: [Validators.required],
      }),
      grad: new FormControl(null, {
        validators: [Validators.required],
      }),
      drzava: new FormControl(null, {
        validators: [Validators.required],
      }),
      tip: new FormControl('korisnik', {
        validators: [Validators.required],
      }),
      profilna: new FormControl(null)
    });
  }

  proveriLozinku():boolean {
    let lozinka = this.form.get('lozinka').value;
    var regLozinka = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,24})', 'g');
    if (!regLozinka.test(lozinka)) return false;
    var regUzastopni = /([a-z])\1{2,}/ig;
    return !(regUzastopni.test(lozinka));
  }

  dodajKorisnika() {
    this.poruka = '';
    if (this.form.invalid) {
      return;
    }
    if (!this.proveriLozinku()) {
      this.poruka = 'Lozinka ne ispunjava zahteve! Pokusajte ponovo';
      return;
    }
    if (
      this.form.get('lozinka').value !==
      this.form.get('ponovljenaLozinka').value
    ) {
      this.poruka = 'Unete lozinke se ne podudaraju! Pokusajte ponovo';
      return;
    }

    console.log(this.form);

    this.korisnikServis.dodajKorisnika(
        this.form.get('ime').value,
        this.form.get('prezime').value,
        this.form.get('korime').value,
        this.form.get('email').value,
        this.form.get('lozinka').value,
        this.form.get('grad').value,
        this.form.get('drzava').value,
        this.form.get('tip').value,
        this.form.get('profilna').value,
        ).subscribe( odgovor => {
          this.poruka = odgovor.poruka;
          console.log(odgovor.korisnik);
        })
    if (localStorage.getItem("korisnik")) {
      let k = JSON.parse(localStorage.getItem("korisnik"));
      if (k.tip === "admin") {
        window.location.reload();
      }
    }
  }

  dodataSlika(event: Event) {
    console.log('dodata slika');
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      //console.log(files);
      const file = files[0];
      console.log(file);
      this.form.get('profilna').patchValue(file);
    }
  }


}
