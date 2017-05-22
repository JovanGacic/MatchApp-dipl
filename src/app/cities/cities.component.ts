import { Component } from '@angular/core';

@Component({
  selector: 'my-cities',
  templateUrl: 'cities.component.html',
  styleUrls: ['cities.component.css']
})
export class CitiesComponent {
  name: string;

  filterPlace(event){
    console.log(event);
  }
}
