import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { NekretninaService } from 'src/app/nekretnina.service';

@Component({
  selector: 'app-kuce-pita',
  templateUrl: './kuce-pita.component.html',
  styleUrls: ['./kuce-pita.component.css']
})
export class KucePitaComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    title: {
      display: true,
      text: 'Kuce'
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

  constructor(private nekretninaServis: NekretninaService) { }

  ngOnInit(): void {
    this.nekretninaServis.kucePodaci().subscribe(rez=> {
      console.log("kuce-pita rezultat:", rez);
      for (var i = 0; i < rez.length; i++) {
        this.pieChartLabels.push(rez[i]._id);
        this.pieChartData.push(rez[i].ukupno);
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

}
