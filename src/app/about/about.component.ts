import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


	leader_obj : Leader[];
  constructor(private leader_instance: LeaderService) { }

  ngOnInit() {
  	this.leader_instance.getLeaders()
  		.then( leader_obj => this.leader_obj = leader_obj);
  }

}
