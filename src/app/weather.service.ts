import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    //"https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=0de82b6b4ba5d843dac44bbee4d02543"
    return this._http
      .get("https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=0de82b6b4ba5d843dac44bbee4d02543")
      .pipe(map(result => result));
  }
}
