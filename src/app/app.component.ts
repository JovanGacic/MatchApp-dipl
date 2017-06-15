import { FirebaseService } from './services/firebase.service';
import { Player } from './models/Player';
import { Component } from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})

export class AppComponent {
	title = 'Match App';
	players: Player[];

	constructor(private auth: Auth, private firebase: FirebaseService) {
		auth.handleAuthentication();
		auth.scheduleRenewal();
	}

}
