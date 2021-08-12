import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/modeli/korisnik';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-nova-nekretnina',
  templateUrl: './nova-nekretnina.component.html',
  styleUrls: ['./nova-nekretnina.component.css'],
})
export class NovaNekretninaComponent implements OnInit {
  form: FormGroup;
  poruka: string = '';
  ulogovanKorisnik: Korisnik;

  constructor(
    private ruter: Router,
    private nekretninaServis: NekretninaService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('korisnik')) {
      this.ruter.navigateByUrl('');
    }
    this.ulogovanKorisnik = JSON.parse(localStorage.getItem('korisnik'));
    let vlasnik = 'agencija';
    if (this.ulogovanKorisnik.tip != 'agent') {
      vlasnik = this.ulogovanKorisnik.korime;
    }
    this.form = new FormGroup({
      naziv: new FormControl(null, {
        validators: [Validators.required],
      }),
      adresa: new FormControl(null, {
        validators: [Validators.required],
      }),
      grad: new FormControl(null, {
        validators: [Validators.required],
      }),
      opstina: new FormControl(null, {
        validators: [Validators.required],
      }),
      kategorija: new FormControl('Kuca', {
        validators: [Validators.required],
      }),
      brojSpratova: new FormControl(null, {
        validators: [Validators.required],
      }),
      brojSprata: new FormControl(null, {
        validators: [Validators.required],
      }),
      kvadratura: new FormControl(null, {
        validators: [Validators.required],
      }),
      brojSoba: new FormControl(null, {
        validators: [Validators.required],
      }),
      imaNamestaj: new FormControl('true', {
        validators: [Validators.required],
      }),
      transakcija: new FormControl('Prodaja', {
        validators: [Validators.required],
      }),
      media: new FormControl(null),
      cena: new FormControl(null, {
        validators: [Validators.required],
      }),
      vlasnik: new FormControl(vlasnik),
    });
  }

  proveriFormat(naziv: string):boolean {
    if (naziv.endsWith(".jpg") || naziv.endsWith(".jpeg") || naziv.endsWith(".png") || naziv.endsWith(".mp4")) return true;
    return false;
  }

  dodatiFajlovi(event: Event) {
    this.poruka = "";
    console.log('dodati fajlovi');
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      if (files.length < 3) {
        this.poruka = "Minimum 3 fajla";
        return;
      }
      for(var i = 0; i < files.length; i++) {
        if (!this.proveriFormat(files[i].name)) {
          this.poruka = "Format " + files[i].name + " nije podrzan";
          return;
        }
      }
      console.log(files);
      this.form.get('media').patchValue(files);
    }
  }

  dodajNekretninu() {
    console.log('dodaj nekretninu');
    if (!this.form.valid) return;
    if (!(this.form.get('media').value) || (this.form.get('media').value).length < 3) {
      this.poruka = "Minimum 3 fajla";
      return;
    }
    //console.log(this.form);
    this.nekretninaServis.dodajNekretninu(
      this.form.get('naziv').value,
      this.form.get('adresa').value,
      this.form.get('grad').value,
      this.form.get('opstina').value,
      this.form.get('kategorija').value,
      this.form.get('brojSpratova').value,
      this.form.get('brojSprata').value,
      this.form.get('kvadratura').value,
      this.form.get('brojSoba').value,
      this.form.get('imaNamestaj').value,
      this.form.get('transakcija').value,
      this.form.get('media').value,
      this.form.get('cena').value,
      this.form.get('vlasnik').value
    ).subscribe((odgovor)=> {
      console.log(odgovor);
      this.poruka = odgovor.poruka;
      location.reload();
    })
  }
}
