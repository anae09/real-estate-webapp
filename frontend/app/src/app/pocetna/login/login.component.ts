import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  korime: string;
  lozinka: string;
  poruka: string = "";

  ngOnInit(): void {
  }

  login() {
    this.poruka = "";
    if (this.korime === "" || this.lozinka === "") {
      this.poruka = "Popuniti sva polja!"
      return;
    }
    this.korisnikServis.dohvatiKorisnika(this.korime, this.lozinka).subscribe(korisnik => {
      if (korisnik) {
        localStorage.setItem("korisnik", JSON.stringify(korisnik));
        this.ruter.navigateByUrl("/" + korisnik.status);
      } else {
        this.poruka = "Ne postoji korisnik sa datim podacima."
      }
    })

  }

}
