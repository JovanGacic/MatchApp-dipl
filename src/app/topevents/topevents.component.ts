import { Component, OnInit } from '@angular/core';

import { Event } from '../models/event';

@Component({
  selector: 'my-topevent',
  templateUrl: './topevents.component.html',
  styleUrls: ['topevents.component.css']
})
export class TopEventsComponent implements OnInit {
  events: Event[] = [];
  constructor() { }
  ngOnInit(): void {

  }
}
