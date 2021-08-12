import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-cenovni-rang',
  templateUrl: './cenovni-rang.component.html',
  styleUrls: ['./cenovni-rang.component.css']
})
export class CenovniRangComponent implements OnInit {

  cenaOd:number = null;
  cenaDo:number = null;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Cenovni rang'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Ukupan broj nekretnina', stack: 'a' },
    { data: [], label: 'Broj nekretnina u cenovnom rangu'}
  ];

  constructor(private nekretninaServis: NekretninaService) { }

  ngOnInit(): void {
    this.nekretninaServis.cenovniRang(null, null).subscribe(rez=> {
      this.barChartData[0].data.push(rez[0].ukupno);
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  potvrdi() {
    if (!this.cenaOd && !this.cenaDo) return;
    if (this.barChartData[1].data.length > 0) {
      this.barChartData[1].data.pop();
    }
    this.nekretninaServis.cenovniRang(this.cenaOd, this.cenaDo).subscribe(rez=> {
      console.log(rez);
      this.barChartData[1].data.push(rez[0].ukupno);
    })
  }

}
