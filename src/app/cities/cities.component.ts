import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-cities',
  templateUrl: 'cities.component.html',
  styleUrls: ['cities.component.css']
})
export class CitiesComponent implements OnInit {

  pageTitle: string;
  selectedCity: string;
  @Input() selectedRegion: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.console(this.selectedRegion);
    this.navigare();
  }

  console(selectedRegion) {
    console.log(selectedRegion);
  }

  navigare() {
    this.router.navigate(['/cities']);
  }
  selectCity(city: string) {
    this.selectedCity = city;
    this.pageTitle = 'Events in ' + city;
  }

}
