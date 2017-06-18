import { Player } from './../models/Player';
import { FirebaseService } from './firebase.service';
import { Event } from './../models/Event';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Auth {
  refreshSubscription: any;
  events: Event[];
  userProfile: any;
  newPlayers = [];
  profile: any;
  requestedScopes: string = 'openid profile read:messages write:messages';
  auth0 = new auth0.WebAuth({
    clientID: 'MRHWALh7ECcEGJgq4HizHtiWp8f6zeNZ',
    domain: 'matchapp.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://matchapp.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200',
    scope: this.requestedScopes
  });

  constructor(public router: Router, private firebase: FirebaseService) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.scheduleRenewal();
    if (this.userProfile) {
      this.profile = this.userProfile;
    } else {
      this.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
    this.unscheduleRenewal();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;

  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        this.firebase.getEvents(profile.sub).subscribe(events => {
          for (let event of events) {
            this.firebase.getPlayers(event.$key).subscribe(players => {
              for (let player of players) {
                this.newPlayers.push(player);
              }
            })
          }
        });
      };
      cb(err, profile);
    });
  }

  public renewToken() {
    this.auth0.renewAuth({
      audience: auth0.apiUrl,
      redirectUri: 'http://localhost:3001/silent',
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        alert(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }


}