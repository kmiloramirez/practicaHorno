import { Component, OnInit } from '@angular/core';
import { Resultado } from './../../dto/resultado';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

const porcentajeCien = 1;

@Component({
  selector: 'app-horno3',
  templateUrl: './horno3.component.html',
  styleUrls: ['./horno3.component.css']
})
export class Horno3Component implements OnInit {
  public num = [0.0094534, 0.0094028];
  public den = [1.984, -0.9841];
  public voltaje = 0.0;
  public intevalo = 0.1;
  public muestreo = 100;
  temperaturaDeseada = 100;
  public voltajes = new Array<number>();
  public intervalos = new Array<string>();
  public temperaturas = new Array<number>();
  public temperaturaMuestra = new Array<number>();
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
    {
      borderColor: 'green',
    }  
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
    this.resultados = new Array<Resultado>();
    this.lineChartData = [
      { data: [0], label: 'Temperatura' },
      { data: [0], label: 'Voltaje' },
      { data: [0], label: 'Referencia temperatura'}
    ];
    this.lineChartLabels = new Array<string>();
    this.temperaturas.push(0, 0, 0, 0);
    this.voltajes.push(this.voltaje, this.voltaje, this.voltaje, this.voltaje);
  }
  private simulacion() {
    this.mostrar = 'grafica';
    for (let muestra = 0; muestra <= this.muestreo; ++muestra) {
      const resul = new Resultado();
      if (muestra <= 3) {
        resul.temperatura = 0;
        resul.intervalo = muestra;
        resul.voltaje = this.voltaje;
        resul.porcentajeVoltaje = 100;
        resul.porcentajeTempatura = 0;
        this.resultados.push(resul);
      } else {
        if (this.temperaturas[muestra - 1] >= this.temperaturaDeseada) {
          this.voltajes.push(0);
          resul.voltaje = 0;
          resul.porcentajeVoltaje = 0;
        } else {
          const porcentaje = Number(((this.temperaturas[muestra - 1] * porcentajeCien) / this.temperaturaDeseada).toFixed(4));
          const nuevoVoltaje = Number((((porcentajeCien - porcentaje) * this.voltaje) / porcentajeCien).toFixed(4));
          this.voltajes.push(nuevoVoltaje);
          resul.voltaje = nuevoVoltaje;
          resul.porcentajeVoltaje =Number(((nuevoVoltaje / this.voltaje) * 100).toFixed(4)) ;
       }
       
        const numXVoltaje1 =Number((this.num[0] * this.voltajes[muestra - 1]).toFixed(4));
        const numXVoltaje2 =Number((this.num[1] * this.voltajes[muestra - 2]).toFixed(4));
        const denXTemperatura1 =Number((this.den[0] * this.temperaturas[muestra - 1]).toFixed(4));
        const denXTemperatura2 =Number((this.den[1] * this.temperaturas[muestra - 2]).toFixed(4));
        const tempertura = Number(((numXVoltaje1 + numXVoltaje2) + (denXTemperatura1 +  denXTemperatura2)).toFixed(4));
        resul.temperatura = tempertura;
        resul.intervalo = muestra;
        resul.porcentajeTempatura =Number(((tempertura / this.temperaturaDeseada) * 100).toFixed(4)) ;
        
        this.temperaturas.push(tempertura);
        this.temperaturaMuestra.push(this.temperaturaDeseada);
        this.intervalos.push(muestra.toString());
        this.resultados.push(resul);
      }
    }

    this.lineChartData = [
      { data: this.temperaturas, label: 'Temperatura' },
      { data: this.voltajes, label: 'Voltaje' },
      { data: this.temperaturaMuestra, label: 'Voltaje' },
    ];
    this.lineChartLabels = this.intervalos;
    this.simulado = true;
  }

}
