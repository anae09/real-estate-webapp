import { Component, OnInit } from '@angular/core';
import { ProcenatService } from 'src/app/procenat.service';

@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent implements OnInit {

  constructor(private procenatServis: ProcenatService) { }

  prodaja: number;
  izdavanje: number;
  poruka: string = "";

  ngOnInit(): void {
    this.procenatServis.dohvatiProcenat().subscribe(p => {
      console.log("procenat", p);
      this.prodaja = p[0].prodaja;
      this.izdavanje = p[0].izdavanje;
      console.log(this.prodaja, this.izdavanje);
    })
  }

  postaviProcenat() {
    if (!this.prodaja || !this.izdavanje) return;
    this.poruka = "";
    this.procenatServis.postaviProcenat(this.prodaja, this.izdavanje).subscribe(odgovor=> {
      this.poruka = odgovor.poruka.toUpperCase();
    })
  }



}
