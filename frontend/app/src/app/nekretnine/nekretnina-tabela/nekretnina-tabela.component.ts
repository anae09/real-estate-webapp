import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Nekretnina } from 'src/app/modeli/nekretnina';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-nekretnina-tabela',
  templateUrl: './nekretnina-tabela.component.html',
  styleUrls: ['./nekretnina-tabela.component.css']
})
export class NekretninaTabelaComponent implements OnInit {

  constructor(private nekretninaServis: NekretninaService, private ruta: ActivatedRoute) { }

  nekretnina:Nekretnina;

  ngOnInit(): void {
    this.ruta.paramMap.subscribe((paramMap:ParamMap)=>{
      if (paramMap.has('id')) {
        this.nekretninaServis.dohvatiNekretninu(paramMap.get('id')).subscribe(odgovor=>{
          //console.log(odgovor.poruka, odgovor.nekretnina);
          this.nekretnina = odgovor.nekretnina;
        })
      }
    });
  }

}
