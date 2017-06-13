import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnChanges {

@Input() eventKey: string;
players: any;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.players = this.db.list('/events/' + this.eventKey + '/players');
  }

  ngOnChanges() {
    this.players = this.db.list('/events/' + this.eventKey + '/players');
  }

}
