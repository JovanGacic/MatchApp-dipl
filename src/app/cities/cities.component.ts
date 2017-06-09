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
  region: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.region = this.selectedRegion;
  }


  navigare() {
    console.log(this.region);
    // this.router.navigate(['/cities']);
  }
  selectCity(city: string) {
    this.selectedCity = city;
    this.pageTitle = 'Events in ' + city;
  }

}
