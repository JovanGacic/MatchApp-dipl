import { Player } from './Player';

export interface Event {
  $key: string;
  eventName: string;
  date: string;
  place: string;
  time: string;
  sport: string;
  userId: string;
  players: Player[];
}
