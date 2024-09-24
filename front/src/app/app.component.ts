import { WeatherForecastApi } from './api/services/weather-forecast-api';
import { WeatherForecast } from './api/models/weather-forecast';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  public weather = [] as WeatherForecast[];
  public platform = inject(PLATFORM_ID);

  protected weatherApi = inject(WeatherForecastApi);
  constructor() {
    this.getWeather();
  }

  async getWeather() {
    this.weather = [];
    if (isPlatformBrowser(this.platform)) {
      this.weather = await firstValueFrom(this.weatherApi.getWeatherForecast$Json());
    }
  }
}
