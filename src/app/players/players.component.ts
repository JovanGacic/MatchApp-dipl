import { Player } from './../models/Player';
import { FirebaseService } from './../services/firebase.service';
import { Auth } from './../services/auth.service';
import { Event } from '../models/Event';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, Input, OnChanges, AfterContentChecked } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnChanges, AfterContentChecked {

  @Input() event: Event;
  players: Player[];
  numberOfPlayers: number;
  userJoined = false;

  constructor(private db: AngularFireDatabase, private firebase: FirebaseService, private auth: Auth) { }

  ngOnInit() { }

  ngOnChanges() {
    this.firebase.getJoinedPlayers(this.event.$key).subscribe(players => { this.players = players });
  }

  ngAfterContentChecked() {
    this.numberOfPlayers = $('.card').length;
    for (let player of this.players) {
      if (player.userId === this.auth.profile.sub) {
        this.userJoined = true;
      }
    }
  }

  joinEvent() {
    const nickname = this.auth.profile.nickname;
    const picture = this.auth.profile.picture;
    const userId = this.auth.profile.sub;
    const joined = new Date().toString();
    const notified = false;
    const newPlayer = {
      nickname: nickname,
      picture: picture,
      userId: userId,
      joined: joined,
      notified: notified
    }
    this.db.list('/events/' + this.event.$key + '/players').push(newPlayer);
  }

}
