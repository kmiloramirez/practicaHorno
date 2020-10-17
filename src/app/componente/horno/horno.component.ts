import { Resultado } from './../../dto/resultado';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-horno',
  templateUrl: './horno.component.html',
  styleUrls: ['./horno.component.css'],
})
export class HornoComponent implements OnInit {
  public voltaje = 0.0;
  public intevalo = 0.1;
  public muestreo = 100;
  temperaturaDeseada = 100;
  public voltajes = new Array<number>();
  public intervalos = new Array<string>();
  public temperaturas = new Array<number>();
  public resultados = new Array<Resultado>();

  public mostrar = 'nada';
  public simulado = false;

  lineChartData: ChartDataSets[];
  lineChartLabels;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() {}

  ngOnInit(): void {}

  iniciarSimulacion() {
    this.reiniciar();
    this.simulacion();
  }

  private reiniciar() {
    this.temperaturas = new Array<number>();
    this.voltajes = new Array<number>();
    this.temperaturas.push(0);
    this.voltajes.push(this.voltaje);
    this.resultados = new Array<Resultado>();
    this.lineChartData = [
      { data: [0], label: 'Temperatura' },
      { data: [0], label: 'Voltaje' },
    ];
    this.lineChartLabels = new Array<string>();
  }
  private simulacion() {
    this.mostrar = 'grafica';
    for (let muestra = 0; muestra < this.muestreo; ++muestra) {
      const resul = new Resultado();
      if (this.temperaturas[muestra - 1] >= this.temperaturaDeseada) {
        this.voltajes.push(0);
      } else {
        this.voltajes.push(this.voltaje);
      }
      if (muestra === 0) {
        resul.temperatura = 0;
        resul.intervalo = 0;
        resul.voltaje = this.voltaje;
        this.resultados.push(resul);
      } else {
        const tempertura =
          this.voltajes[muestra - 1] * this.intevalo +
          this.temperaturas[muestra - 1];
        resul.temperatura = tempertura;
        resul.intervalo = muestra;
        resul.voltaje = this.voltajes[muestra - 1] ;
        this.temperaturas.push(tempertura);
        this.intervalos.push(muestra.toString());
        this.resultados.push(resul);
      }
    }
    this.lineChartData = [
      { data: this.temperaturas, label: 'Temperatura' },
      { data: this.voltajes, label: 'Voltaje' },
    ];
    this.lineChartLabels = this.intervalos;
    this.simulado = true;
  }
}
