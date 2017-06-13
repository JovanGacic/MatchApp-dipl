import { AngularFireDatabase } from 'angularfire2/database';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Event } from '../models/Event';

@Component({
	selector: 'event-detail',
	templateUrl: './event-detail.component.html'
})

export class EventDetailComponent implements OnInit {

	constructor(private route: ActivatedRoute, private location: Location, private db: AngularFireDatabase) { }

	@Input() event: Event;
	name: string;
	place: string;
	date: string;
	time: string;
	key: string;

	ngOnInit(): void {
		this.name = this.event.eventName;
		this.place = this.event.place;
		this.date = this.event.date;
		this.time = this.event.time;
		this.key = this.event.$key;
	}

	updateEvent() {
		const eventName = this.name;
		const place = this.place;
		const date = this.date;
		const time = this.time;
		const updateEvent = {
			eventName: eventName,
			place: place,
			date: date,
			time: time
		};
		this.db.list('/events').update(this.key, updateEvent);
	}

}
