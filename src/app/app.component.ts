import { Component } from '@angular/core';
import { EventService} from './services/event.service';
import { Auth } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',

	providers: [ EventService ]
})

export class AppComponent {
	title = 'Match App';

	constructor( private auth:Auth){
		auth.handleAuthentication();
	}
}
