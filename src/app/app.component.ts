import { Notification } from './models/Notification';
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
	notifications: Notification[];

	constructor(private auth: Auth, private firebase: FirebaseService) {
		auth.handleAuthentication();
		auth.scheduleRenewal();
	}

	ngAfterContentChecked() {
		if (this.auth.profile) {
			this.newPlayers = this.auth.newPlayers;
			this.firebase.getNotifications(this.auth.profile.sub).subscribe(notifications => {
				this.notifications = notifications;
			});
			this.nbOfNotifications = this.auth.newPlayers.length + this.notifications.length;
		}

	}

	showNotifications() {
		$('#notifications')
			.popup({
				hoverable: true,
				on: 'click',
				position: 'bottom left',
				lastResort: 'bottom left',
				popup: $('.custom.popup')
			})
			.popup('show');
	}

	goToEvent() {
		// this.selectedCity = city;
		// this.pageTitle = 'Events in ' + city;
		// this.router.navigate(['/events'], { queryParams: { city: this.selectedCity, pageTitle: this.pageTitle } });
	}

}
