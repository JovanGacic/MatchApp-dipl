import { FirebaseService } from './services/firebase.service';
import { Player } from './models/Player';
import { Component, AfterContentChecked } from '@angular/core';
import { Auth } from './services/auth.service';

declare const $: any;

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})

export class AppComponent implements AfterContentChecked {
	title = 'Match App';
	players: Player[];
	nbOfNotifications: number;
	newPlayers: Player[];

	constructor(private auth: Auth, private firebase: FirebaseService) {
		auth.handleAuthentication();
		auth.scheduleRenewal();
	}

	ngAfterContentChecked() {
		this.nbOfNotifications = this.auth.newPlayers.length;
		this.newPlayers = this.auth.newPlayers;
	}

	showNotifications() {
		$('#notifications')
			.popup({
				hoverable: true,
				on: 'click',
				lastResort: 'bottom center',
				popup: $('.custom.popup')
			})
			.popup('show');
	}

}
