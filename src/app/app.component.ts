import { Component } from '@angular/core';
import { Auth } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})

export class AppComponent {
	title = 'Match App';

	constructor( private auth:Auth){
		auth.handleAuthentication();
	}
}
