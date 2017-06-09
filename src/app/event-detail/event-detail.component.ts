import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } 		from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Event } from '../models/Event';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html'
})

export class EventDetailComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private location: Location
	){}

	 @Input() event: Event;

	 ngOnInit(): void {

}

	 goBack(): void {
  this.location.back();
}

}
