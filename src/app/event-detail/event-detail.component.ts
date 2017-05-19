import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } 		from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { EventService } from '../services/event.service';
import { Event } from '../event/event.component';

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html'
})

export class EventDetailComponent implements OnInit {

	constructor(
		private eventService: EventService,
		private route: ActivatedRoute,
		private location: Location
	){}

	 @Input() event: Event;

	 ngOnInit(): void {
  this.route.params
    .switchMap((params: Params) => this.eventService.getEvent(+params['id']))
    .subscribe(event => this.event = event);
}

	 goBack(): void {
  this.location.back();
}

}
