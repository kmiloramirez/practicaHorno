import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/dto/resultado';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

const porcentaje2 = 0.02;

@Component({
  selector: 'app-horno4',
  templateUrl: './horno4.component.html',
  styleUrls: ['./horno4.component.css']
})
export class Horno4Component implements OnInit {

  public num = [0.0094534, 0.0094028];
  public den = [1.984, -0.9841];
  public k = 0.3;
  public voltaje = 100;
  public temperaturaAmbiente = 16;
  public muestreo = 1000;
  public mp = 0;
  public po = 0;
  temperaturaDeseada = 100;
  public sistemeEstable = false;
  public tiempoEstabilizacion = 0;
  public errorEstacionario = 0;
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
    this.temperaturas.push(this.temperaturaAmbiente, this.temperaturaAmbiente, this.temperaturaAmbiente, this.temperaturaAmbiente);
    this.voltajes.push(this.voltaje, this.voltaje, this.voltaje, this.voltaje);
  }
  private simulacion() {
    const estabilizacionSuperior = this.temperaturaDeseada + (this.temperaturaDeseada*porcentaje2)
    const estabilizacioninferior = this.temperaturaDeseada - (this.temperaturaDeseada*porcentaje2)
    console.log("estabilizacionSuperior:" + estabilizacionSuperior)
    console.log("estabilizacioninferior:" + estabilizacioninferior)
    this.mostrar = 'grafica';
    let tempertura = this.temperaturaAmbiente;
    for (let muestra = 0; muestra <= this.muestreo; ++muestra) {
      const resul = new Resultado();
      if (muestra <= 3) {
        resul.temperatura = this.temperaturaAmbiente;
        resul.intervalo = muestra;
        resul.voltaje = this.voltaje;
        resul.porcentajeVoltaje = 100;
        resul.porcentajeTempatura = Number(((tempertura / this.temperaturaDeseada) * 100).toFixed(4)) ;
        this.resultados.push(resul);
      } else {
        if (this.temperaturas[muestra - 1] >= this.temperaturaDeseada) {
          this.voltajes.push(0);
          resul.voltaje = 0;
          resul.porcentajeVoltaje = 0;
        } else {
          const error = this.temperaturaDeseada - this.temperaturas[muestra - 1]
          const nuevoVoltaje = Number(((this.k * error).toFixed(4)));
          if(nuevoVoltaje > this.voltaje){
            this.voltajes.push(this.voltaje);
            resul.voltaje = this.voltaje;
          }
          else{
            this.voltajes.push(nuevoVoltaje);
            resul.voltaje = nuevoVoltaje;
          }          
          resul.porcentajeVoltaje =Number(((resul.voltaje / this.voltaje) * 100).toFixed(4)) ;
       }
       
        const numXVoltaje1 =Number((this.num[0] * this.voltajes[muestra - 1]).toFixed(4));
        const numXVoltaje2 =Number((this.num[1] * this.voltajes[muestra - 2]).toFixed(4));
        const denXTemperatura1 =Number((this.den[0] * this.temperaturas[muestra - 1]).toFixed(4));
        const denXTemperatura2 =Number((this.den[1] * this.temperaturas[muestra - 2]).toFixed(4));
        tempertura = Number(((numXVoltaje1 + numXVoltaje2) + (denXTemperatura1 +  denXTemperatura2)).toFixed(4));
        resul.temperatura = tempertura;
        resul.intervalo = muestra;
        resul.porcentajeTempatura =Number(((tempertura / this.temperaturaDeseada) * 100).toFixed(4)) ;
        
        this.temperaturas.push(tempertura);
        this.temperaturaMuestra.push(this.temperaturaDeseada);
        this.intervalos.push(muestra.toString());
        this.resultados.push(resul);
        if(tempertura > this.mp){
          this.mp = tempertura
        }
      }

      if(tempertura < estabilizacionSuperior && tempertura > estabilizacioninferior  ){
        console.log("estable:")
        if(this.sistemeEstable == false){
          this.sistemeEstable = true;
          this.tiempoEstabilizacion = muestra;
        }
        
      }
      else {
        if(this.sistemeEstable){
          console.log("no estable :")
          this.sistemeEstable = false;
          this.tiempoEstabilizacion = 0;
        }
      }

    }

    this.po= Number((((this.mp -tempertura)/tempertura)).toFixed(4)) ; 
    if(this.sistemeEstable){
      this.errorEstacionario = (this.temperaturaDeseada - tempertura)
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
