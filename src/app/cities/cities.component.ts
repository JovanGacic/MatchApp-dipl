import { Location } from '@angular/common';
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

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.navigate();
  }

  navigate() {
    this.router.navigate(['/cities']);
    console.log(this.selectedRegion);
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.pageTitle = 'Events in ' + city;
  }

}
