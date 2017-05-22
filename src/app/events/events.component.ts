import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.component';

import { EventService } from '../services/event.service';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'my-events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;
  constructor(private eventService: EventService, private auth:Auth) { }
  getEvents(): void {
    this.eventService.getEvents().then(events => this.events = events);
  }
  ngOnInit(): void {
    this.getEvents();
  }
  onSelect(event: Event): void {
    this.selectedEvent = event;
  }
  filterPlace(selectedEvent){
    console.log(selectedEvent);
  }
}
