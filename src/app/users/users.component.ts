import {Component, HostBinding, OnInit} from '@angular/core';
import {routeFadeStateTrigger, routeSlideStateTrigger} from '../animations/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [routeFadeStateTrigger,
    routeSlideStateTrigger]
})
export class UsersComponent implements OnInit {
  //@HostBinding('@routeFadeState') routeAnimation = true;
  @HostBinding('@routeSlideState') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
