import { Component, OnInit } from '@angular/core';

import { Event } from '../event/event.component';
import { EventService } from '../services/event.service';

@Component({
  selector: 'my-topevent',
  templateUrl: './topevents.component.html',
})
export class TopEventsComponent implements OnInit {
  events: Event[] = [];
  constructor(private eventService: EventService) { }
  ngOnInit(): void {
    this.eventService.getEvents()
      .then(events => this.events = events.slice(0, 5));
  }
}
