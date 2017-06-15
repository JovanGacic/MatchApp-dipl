import { Auth } from './../services/auth.service';
import { Place } from './../models/Place';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Town } from './../models/Town';
import { Sport } from './../models/Sport';

import { Component } from '@angular/core';

declare const $: any;

@Component({
    selector: 'newevent',
    templateUrl: 'newevent.component.html',
    styleUrls: ['newevent.component.css']
})

export class NewEventComponent {
    name: string;
    selectedPlace: string;
    selectedTime: string;
    selectedSport: string;
    selectedDate: Date;
    selectedtown: string;
    newEventKey: string;
    sports: FirebaseListObservable<Sport[]>;
    towns: FirebaseListObservable<Town[]>;
    places: FirebaseListObservable<Place[]>;

    constructor(private db: AngularFireDatabase, public auth: Auth) {
        this.sports = db.list('/sports');
        this.towns = db.list('/towns');
    }

    getPlaces(key) {
        this.places = this.db.list('/towns/' + key + '/places');
        this.selectedtown = $('#' + key).text();
    }

    setPlace(selectedPlace) {
        this.selectedPlace = selectedPlace;
    }

    setSport(selectedSport) {
        this.selectedSport = selectedSport;
    }

    setDate(selectedDate) {
        this.selectedDate = selectedDate;
    }

    setTime(selectedTime) {
        this.selectedTime = selectedTime;
    }

    createEvent(eventName) {
        const town = this.selectedtown;
        const place = this.selectedPlace;
        const sport = this.selectedSport;
        const date = this.selectedDate;
        const time = this.selectedTime;
        const userId = this.auth.profile.sub;
        const newEvent = {
            eventName: eventName,
            town: town,
            place: place,
            sport: sport,
            date: date,
            time: time,
            userId: userId
        };
        const events = this.db.list('/events', { preserveSnapshot: true });
        events.push(newEvent).once('value', (snapshot) => this.newEventKey = snapshot.key);

        const notified = true;
        const nickname = this.auth.profile.nickname;
        const picture = this.auth.profile.picture;
        const newPlayer = {
            nickname: nickname,
            picture: picture,
            notified: notified
        }
        const players = this.db.list('/events/' + this.newEventKey + '/players');
        players.push(newPlayer);
    }

    alert() {
        alert('You have successfully created event!');
    }

}
