import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../models/Event';

import { Auth } from '../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'events',
  templateUrl: 'events.component.html',
  styleUrls: ['events.component.css']
})
export class EventsComponent implements OnInit {

  events: FirebaseListObservable<Event[]>;
  selectedEvent: Event;
  items: FirebaseListObservable<any[]>;
  title: string;
  joinButton = false;

  @Input() selectedCity: string;
  @Input() pageTitle: string;

  constructor(private auth: Auth, private db: AngularFireDatabase) {
    this.items = db.list('/items');
  }

  ngOnInit(): void {
        if (!this.selectedCity) {
      this.title = 'My events';
      this.events = this.db.list('/events', {
        query: {
          orderByChild: 'userId',
          equalTo: this.auth.profile.sub
        }
      });
    } else {
      this.joinButton = true;
      this.title = this.pageTitle;
      this.events = this.db.list('/events', {
        query: {
          orderByChild: 'town',
          equalTo: this.selectedCity
        }
      });
    }
  }

  selectMatch(event: Event): void {
    this.selectedEvent = event;
  }

  getDate(event: Event) {
    var date = new Date(event.date);
    console.log(date);
  }
}
