import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-cities',
  templateUrl: 'cities.component.html',
  styleUrls: ['cities.component.css']
})
export class CitiesComponent implements OnInit {

  pageTitle: string;
  selectedCity: string;
  selectedRegion: string;

  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.selectedRegion = this.route.snapshot.queryParams['region'];
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.pageTitle = 'Events in ' + city;
  }

}
