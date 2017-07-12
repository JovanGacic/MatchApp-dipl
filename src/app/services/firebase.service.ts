import { Notification } from './../models/Notification';
import { Player } from './../models/Player';
import { Auth } from './auth.service';
import { Event } from './../models/Event';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class FirebaseService {

    events: FirebaseListObservable<Event[]>;
    players: FirebaseListObservable<Player[]>;
    notifications: FirebaseListObservable<Notification[]>;

    constructor(private db: AngularFireDatabase) {
    }

    getEvents(id) {
        this.events = this.db.list('/events', {
            query: {
                orderByChild: 'userId',
                equalTo: id
            }
        }) as FirebaseListObservable<Event[]>;
        return this.events;
    }

    getPlayers(key) {
        this.players = this.db.list('/events/' + key + '/players', {
            query: {
                orderByChild: 'notified',
                equalTo: false
            }
        }) as FirebaseListObservable<Player[]>;
        return this.players;
    }

    getJoinedPlayers(key) {
        this.players = this.db.list('/events/' + key + '/players') as FirebaseListObservable<Player[]>;
        return this.players;
    }

    getNotifications(id: string) {
        this.notifications = this.db.list('/notifications', {
            query: {
                orderByChild: 'userId',
                equalTo: id
            }
        }) as FirebaseListObservable<Notification[]>;
        return this.notifications;
    }

}