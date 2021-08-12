import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-nekretnina-izmena',
  templateUrl: './nekretnina-izmena.component.html',
  styleUrls: ['./nekretnina-izmena.component.css'],
})
export class NekretninaIzmenaComponent implements OnInit {
  constructor(
    private ruta: ActivatedRoute,
    private nekretninaServis: NekretninaService,
    private ruter: Router
  ) {}

  nekretnina: Nekretnina;
  poruka: string = '';

  form: FormGroup;
  formaPodaci: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      media: new FormControl(null),
    });
    this.ruta.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('id')) {
        this.nekretninaServis
          .dohvatiNekretninu(paramMap.get('id'))
          .subscribe((odgovor) => {
            console.log(odgovor);
            this.nekretnina = odgovor.nekretnina;
            this.formaPodaci = new FormGroup({
              naziv: new FormControl(this.nekretnina.naziv, {
                validators: [Validators.required],
              }),
              adresa: new FormControl(this.nekretnina.adresa, {
                validators: [Validators.required],
              }),
              grad: new FormControl(this.nekretnina.grad, {
                validators: [Validators.required],
              }),
              opstina: new FormControl(this.nekretnina.opstina, {
                validators: [Validators.required],
              }),
              kategorija: new FormControl(this.nekretnina.kategorija, {
                validators: [Validators.required],
              }),
              brojSpratova: new FormControl(this.nekretnina.brojSpratova, {
                validators: [Validators.required],
              }),
              brojSprata: new FormControl(this.nekretnina.brojSprata, {
                validators: [Validators.required],
              }),
              kvadratura: new FormControl(this.nekretnina.kvadratura, {
                validators: [Validators.required],
              }),
              brojSoba: new FormControl(this.nekretnina.brojSoba, {
                validators: [Validators.required],
              }),
              imaNamestaj: new FormControl((this.nekretnina.imaNamestaj? "true": "false"), {
                validators: [Validators.required],
              }),
              transakcija: new FormControl(this.nekretnina.transakcija, {
                validators: [Validators.required],
              }),
              cena: new FormControl(this.nekretnina.cena, {
                validators: [Validators.required],
              }),
              vlasnik: new FormControl(this.nekretnina.vlasnik)
            });
          });
      } else {
        this.ruter.navigateByUrl('');
      }
    });
  }

  ukloniSliku(slika: string) {
    this.poruka = '';
    if (this.nekretnina.slike.length == 1) {
      this.poruka = 'Mora da postoji bar 1 slika';
      return;
    }
    this.nekretninaServis
      .ukloniSliku(this.nekretnina._id, slika)
      .subscribe((odgovor) => {
        console.log(odgovor.poruka);
        this.nekretnina.slike = this.nekretnina.slike.filter(
          (s) => s !== slika
        );
      });
  }

  ukloniVideo(video: string) {
    this.nekretninaServis
      .ukloniVideo(this.nekretnina._id, video)
      .subscribe((odgovor) => {
        console.log(odgovor.poruka);
        this.nekretnina.video = this.nekretnina.video.filter(
          (v) => v !== video
        );
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

  dodajFajlove() {
    if (!this.form.get('media').value) return;
    this.nekretninaServis.dodajFajlove(this.nekretnina._id, this.form.get('media').value).subscribe(odgovor=>{
      console.log(odgovor);
      for (var i = 0; i < odgovor.images.length; i++) {
        this.nekretnina.slike.push(odgovor.images[i]);
      }
      for (var j = 0; j < odgovor.video.length; j++) {
        this.nekretnina.video.push(odgovor.video[i]);
      }
    })
  }

  azurirajPodatke() {
    console.log('azuriraj podatke');
    if (!this.formaPodaci.valid) return;
    console.log(this.formaPodaci);
    this.nekretninaServis.azurirajNekretninu(
      this.nekretnina._id,
      this.formaPodaci.get('naziv').value,
      this.formaPodaci.get('adresa').value,
      this.formaPodaci.get('grad').value,
      this.formaPodaci.get('opstina').value,
      this.formaPodaci.get('kategorija').value,
      this.formaPodaci.get('brojSpratova').value,
      this.formaPodaci.get('brojSprata').value,
      this.formaPodaci.get('kvadratura').value,
      this.formaPodaci.get('brojSoba').value,
      this.formaPodaci.get('imaNamestaj').value,
      this.formaPodaci.get('transakcija').value,
      this.formaPodaci.get('cena').value,
      this.formaPodaci.get('vlasnik').value
    ).subscribe((odgovor)=> {
      console.log(odgovor);
      this.poruka = odgovor.poruka;
    })
  }
}
