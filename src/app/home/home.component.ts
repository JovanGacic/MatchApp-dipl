import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';


@Component({
	selector: 'my-home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

	events: FirebaseListObservable<Event[]>;

	constructor(private auth: Auth, private db: AngularFireDatabase) { }

	ngOnInit() {}

	getEvents() {
		this.events = this.db.list('/events', {
			query: {
				orderByChild: 'userId',
				equalTo: this.auth.profile.sub
			}
		}) as FirebaseListObservable<Event[]>;
		return this.events;
	}


}

