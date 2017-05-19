import { Injectable } from '@angular/core';
import { Event } from '../event/event.component';
import { EVENTS } from '../mock-events';

@Injectable()
export class EventService {
  getEvents(): Promise<Event[]> {
    return Promise.resolve(EVENTS);
  }
  getEvent(id: number): Promise<Event> {
  return this.getEvents()
             .then(events => events.find(event => event.id === id));
}

}
