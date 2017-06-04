import { Auth } from './../services/auth.service';
import { Place } from './../models/Place';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Town } from './../models/Town';
import { Sport } from './../models/Sport';

import { Component } from '@angular/core';

@Component({
    selector: 'newevent',
    templateUrl: 'newevent.component.html',
    styleUrls: ['newevent.component.css']
})

export class NewEventComponent {
    name: string;
    place: string;
    time: string;
    sport: string;
    date: Date;

    sports: FirebaseListObservable<Sport[]>;
    towns: FirebaseListObservable<Town[]>;
    places: FirebaseListObservable<Place[]>;

    constructor(private db: AngularFireDatabase, public auth: Auth) {
        this.sports = db.list('/sports');
        this.towns = db.list('/towns');
    }

    getPlaces(key) {
        console.log(key);
        this.places = this.db.list('/towns/' + key + '/places');
    }

    createEvent(eventName) {
        const userId = this.auth.profile.sub;
        const newEvent = {
            eventName: eventName,
            userId: userId
        }
        console.log(newEvent);
    }

}
