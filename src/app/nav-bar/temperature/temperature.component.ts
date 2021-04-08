import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  private temp_max: number[] = [];
  private temp_min: number[] = [];
  private temp: number[] = [];
  private weatherDates: string[] = [];

  public chart = [];

  constructor(private _weather: WeatherService) {

  }

  private convertDates(all_dates: number[]) {
    all_dates.forEach((item) => {
      let jsdate = new Date(item * 1000);
      this.weatherDates.push(jsdate.toLocaleTimeString('en', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric'
      }));
    });
  }

  private getChartData(dates: string[], maxTemps: number[], minTemps: number[], temp) {
    var data = {
      labels: dates,
      datasets: [{
        label: 'Temp',
        data: temp,
        borderColor: 'violet',
        backgroundColor: 'black',
        pointBackgroundColor: 'black',
        borderWidth: 1,
        fill: false,
        type: 'line'
      },
      {
        label: 'Temp Min',
        data: minTemps,
        backgroundColor: 'rgba(131,199,219,0.2)',
        borderColor: 'rgba(131,199,219,1)',
        borderWidth: 2,
        hoverBackgrounColor: 'rgba(131,199,219,0.4)',
        hoverBorderColor: 'rgba(131,199,219,1.0)',
      },
      {
        label: 'Temp Max',
        data: maxTemps,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgrounColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1.0)',
      }]
    }
    return data;
  };

  private getChartOptions() {
    var options = {
      title: {
        display: true,
        text: 'Temperature Forecast'
      },
      animation: {
        duration: 2500,
      },
      tooltips: {
        backgroundColor: 'rgba(48, 47, 46, 0.8)',
        borderColor: 'rgba(73, 72, 70, 1)',
        borderWidth: 1,
        multiKeyBackground: 'rgba(48, 47, 46, 0.8)'
      },
      legend: {
        display: true,
        position: 'right'
      },
      scales: {
        xAxes: [{
          barPercentage: 1,
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.2)"
          }
        }]
      }
    }
    return options;
  }

  private createChart(dates: string[], maxTemps: number[], minTemps: number[], temp: number[]) {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: this.getChartData(dates, maxTemps, minTemps, temp),
      options: this.getChartOptions()
    });
  }

  ngOnInit() {

    this._weather.dailyForecast()
      .subscribe(
        res => {
          this.temp_max = res['list'].map(res => res.main.temp_max);
          this.temp_min = res['list'].map(res => res.main.temp_min);
          this.temp = res['list'].map(res => res.main.temp);
          let all_dates = res['list'].map(res => res.dt);

          this.convertDates(all_dates);
          this.createChart(this.weatherDates, this.temp_max, this.temp_min, this.temp);
        },
        error => {
          console.log("Error:" + error.toString() + "\n Creating default chart...");
          this.temp_max = [279.946, 282.597, 280.15];
          this.temp_min = [259.946, 262.597, 260.15];
          this.temp = [269.946, 272.597, 265.15];
          let all_dates = [1485717216, 1485745061, 1485768552];

          this.convertDates(all_dates);
          this.createChart(this.weatherDates, this.temp_max, this.temp_min, this.temp);

        }
      );
  }

}
