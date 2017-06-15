import { Player } from './../models/Player';
import { Auth } from './auth.service';
import { Event } from './../models/Event';
import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class FirebaseService {

    events: FirebaseListObservable<Event[]>;
    players: FirebaseListObservable<Player[]>

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

}