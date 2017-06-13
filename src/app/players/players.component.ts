import { Auth } from './../services/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, Input, OnChanges, AfterContentChecked } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnChanges, AfterContentChecked {

  @Input() eventKey: string;
  players: FirebaseListObservable<any>;
  numberOfPlayers: number;

  constructor(private db: AngularFireDatabase, private auth: Auth) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.players = this.db.list('/events/' + this.eventKey + '/players');
  }

  ngAfterContentChecked() {
    this.numberOfPlayers = $('.card').length;
  }

  joinEvent() {
    const nickname = this.auth.profile.nickname;
    const picture = this.auth.profile.picture;
    const newPlayer = {
      nickname: nickname,
      picture: picture
    }
    this.db.list('/events/' + this.eventKey + '/players').push(newPlayer);
  }

}
