import { Notification } from './../models/Notification';
import { User } from './../models/User';
import { Auth } from './../services/auth.service';
import { Place } from './../models/Place';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Town } from './../models/Town';
import { Sport } from './../models/Sport';

import { Component } from '@angular/core';

declare const $: any;
declare const require: any;

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
    userId: string;
    access_token: string;
    notifications: FirebaseListObservable<Notification[]>
    users: User[];
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
        // Create new event and push iz to firebase
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

        // Create player (owner) of event and push it to firebase
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

        // Get all user id's from auth0 user database
        this.getToken();
    }

    getToken() {
        const request = require('request');
        const options = {
            method: 'POST',
            url: 'https://matchapp.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body:
            {
                grant_type: 'client_credentials',
                client_id: 'G7GxrEEzfe2Rhg95sD7KGt94fmelx971',
                client_secret: 'EJ_5BSTuT3dCRUhmqDJMD1AbZI8jchUj76qUDqVZe7Fw9dLFYyjn0h0nBDwxzyTz',
                audience: 'https://matchapp.eu.auth0.com/api/v2/'
            },
            json: true
        };
        const self = this;
        request(options, function (error, response, body) {
            if (error) { throw new Error(error); }
            self.access_token = body.access_token;
            self.getUser();
        });
    }

    getUser() {
        const request = require('request');
        const options = {
            method: 'GET',
            url: 'https://matchapp.eu.auth0.com/api/v2/users',
            headers:
            {
                authorization: 'Bearer ' + this.access_token,
                'content-type': 'application/json'
            },
            json: true
        };
        const self = this;
        request(options, function (error, response, body) {
            if (error) { throw new Error(error); }
            self.users = body;
            console.log(self.users);
            self.createNotifications();
        });
    }

    // Creates notifications in firebase so that every user gets notified that new event is created
    createNotifications() {
        for (let user of this.users) {
            const userId = user.user_id;
            const notified = false;
            const eventKey = this.newEventKey;
            const newNotification = {
                userId: userId,
                notified: notified,
                eventKey: eventKey
            }
            this.notifications = this.db.list('/notifications/');
            this.notifications.push(newNotification);
        }
    }

    alert() {
        alert('You have successfully created event!');
    }

}
