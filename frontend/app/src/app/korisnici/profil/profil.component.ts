import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';
import { Korisnik } from 'src/app/modeli/korisnik';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  constructor(private korisnikServis: KorisnikService, private ruta: ActivatedRoute, private ruter: Router) {}

  ulogovan: Korisnik;
  korisnikProfil: Korisnik;
  form: FormGroup;
  poruka: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem('korisnik')) {
      this.ruter.navigateByUrl('');
    }

    this.form = new FormGroup({
      korime: new FormControl(null),
      profilna: new FormControl(null),
    });

    this.ulogovan = JSON.parse(localStorage.getItem('korisnik'));
    console.log("Profil-ulogovan korisnik", this.ulogovan);

    this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('username')) {
        this.form.get('korime').patchValue(paramMap.get('username'));
        this.korisnikServis.dohvatiKorisnikaKorime(paramMap.get('username')).subscribe(korisnik=> {
          this.korisnikProfil = korisnik;
        });
      } else {
        this.form.get('korime').patchValue(this.ulogovan.korime);
        this.korisnikProfil = this.ulogovan;
      }
    });


  }

  promenaSlike: boolean = false;

  prikaziPromenuSlike() {
    this.promenaSlike = true;
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

  promeniSliku() {
    this.korisnikServis
      .izmeniSliku(
        this.form.get('korime').value,
        this.form.get('profilna').value
      )
      .subscribe((odgovor)=> {
        console.log(odgovor.poruka);
        this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
          if (this.ulogovan.korime === this.korisnikProfil.korime) {
            this.ulogovan.profilnaPath = odgovor.profilnaPath;
            localStorage.setItem("korisnik", JSON.stringify(this.ulogovan));
          } else {
            this.korisnikProfil.profilnaPath = odgovor.profilnaPath;
          }
        });
      });
  }
}
