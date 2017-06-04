import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.component';

import { EventService } from '../services/event.service';
import { Auth } from '../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'my-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;
  items: FirebaseListObservable<any[]>;
  constructor(private eventService: EventService, private auth: Auth, db: AngularFireDatabase) {
    this.items = db.list('/items');
    console.log(this.items);
  }
  getEvents(): void {
    this.eventService.getEvents().then(events => this.events = events);
  }
  ngOnInit(): void {
    this.getEvents();
  }
  onSelect(event: Event): void {
    this.selectedEvent = event;

  }
  getDate(event: Event) {
    var date = new Date(event.date);
    console.log(date);
  }
}
