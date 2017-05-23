import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { TopEventsComponent } from './topevents/topevents.component';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from "app/search/search.component";
import { NotFoundComponent } from "./notfound/notfound.component";

import { EventService } from './services/event.service';
import { Auth } from './services/auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireModule } from 'angularfire2';
import { environment } from './environment';



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
		NotFoundComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule, 
		AngularFireModule.initializeApp(environment.firebase),
    HttpModule,
	RouterModule.forRoot([
    {
			path: 'home',
			component: HomeComponent
		},
		{	path: 'events',
			component: EventsComponent
		},
    {
			path: 'cities',
			component: CitiesComponent
		},
		{
			path: 'topevents',
			component: TopEventsComponent
		},
		{
			path: '',
			redirectTo: '/home',
			pathMatch: 'full'
		},
		{
			path: 'detail/:id',
			component: EventDetailComponent
		},
    {
      path: 'profile',
      component: ProfileComponent
    },
		{
			path: 'search',
			component: SearchComponent
		},
		{
			path: '**',
			component: NotFoundComponent
		}
	])
  ],
  providers: [
		 AUTH_PROVIDERS,
    Auth,
		AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})

export class AppModule {




}
