import { FirebaseService } from './services/firebase.service';
import { AuthGuardService } from './services/authguard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { TopEventsComponent } from './topevents/topevents.component';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from 'app/search/search.component';
import { NotFoundComponent } from './notfound/notfound.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from './services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from './environment';
import { AuthGuardService as AuthGuard } from 'app/services/authguard.service';
import { NewEventComponent } from './newevent/newevent.component';
import { PlayersComponent } from './players/players.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig({
		tokenGetter: (() => localStorage.getItem('access_token'))
	}), http, options);
}

@NgModule({
	declarations: [
		AppComponent,
		EventDetailComponent,
		EventsComponent,
		TopEventsComponent,
		HomeComponent,
		CitiesComponent,
		ProfileComponent,
		SearchComponent,
		NewEventComponent,
		NotFoundComponent,
		PlayersComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		HttpModule,
		RouterModule.forRoot([
			{ path: 'home', component: HomeComponent },
			{ path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
			{ path: 'cities', component: CitiesComponent, canActivate: [AuthGuard] },
			{ path: 'topevents', component: TopEventsComponent, canActivate: [AuthGuard] },
			{ path: '', redirectTo: '/home', pathMatch: 'full' },
			{ path: 'detail/:id', component: EventDetailComponent },
			{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
			{ path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
			{ path: 'newevent', component: NewEventComponent, canActivate: [AuthGuard] },
			{ path: '**', component: NotFoundComponent }
		])
	],
	providers: [
		Auth,
		AngularFireDatabase,
		AuthGuard,
		FirebaseService,
		{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
	],
	bootstrap: [AppComponent]
})

export class AppModule {




}
