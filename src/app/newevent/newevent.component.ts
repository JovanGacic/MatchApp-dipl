
import { Component } from "@angular/core";

@Component({
    selector: 'newevent',
    templateUrl: 'newevent.component.html',
    styleUrls: ['newevent.component.css']
})

export class NewEventComponent{
    name : string;
    place : string;
    time : string;
    sport : string;
}