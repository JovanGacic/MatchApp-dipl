import { Router } from '@angular/router';
import { Component } from "@angular/core";

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent{

    selectedRegion: string;

    constructor(private router: Router) {}

    selectRegion(region:string) {
        this.selectedRegion = region;
        this.navigate();
    }

    navigate() {
        this.router.navigate(['/cities']);
    }
}
