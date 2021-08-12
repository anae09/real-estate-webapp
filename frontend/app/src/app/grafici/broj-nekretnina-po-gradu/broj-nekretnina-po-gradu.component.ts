import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-broj-nekretnina-po-gradu',
  templateUrl: './broj-nekretnina-po-gradu.component.html',
  styleUrls: ['./broj-nekretnina-po-gradu.component.css']
})
export class BrojNekretninaPoGraduComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks: {
      beginAtZero: true,
    }}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Broj nekretnina po gradu' }
  ];

  constructor(private nekretninaServis: NekretninaService) { }

  ngOnInit(): void {
    this.nekretninaServis.brojNekretninaPoGradu().subscribe(rez=> {
      for (var i = 0; i < rez.length; i++) {
        this.barChartLabels.push(rez[i]._id);
        this.barChartData[0].data.push(rez[i].ukupno);
      }
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

}
