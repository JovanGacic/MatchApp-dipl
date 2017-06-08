import { Component } from '@angular/core';

@Component({
  selector: 'my-cities',
  templateUrl: 'cities.component.html',
  styleUrls: ['cities.component.css']
})
export class CitiesComponent {

  pageTitle: string;
  selectedCity: string;

  selectCity(city) {
    this.selectedCity = city;
    this.pageTitle = 'Events in ' + city;
    console.log(this.selectedCity, this.pageTitle);
  }

}
