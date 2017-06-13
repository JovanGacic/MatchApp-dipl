import { Router, Params } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent{

    selectedRegion: string;

    constructor(private router: Router) {}

    selectRegion(region) {
        this.selectedRegion = region;
        this.navigate();
    }

    navigate() {
        this.router.navigate(['/cities'], {queryParams: {region: this.selectedRegion}});
    }
}
