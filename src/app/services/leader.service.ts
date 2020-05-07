import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


	getLeaders(): Leader[]  {
		return LEADER;
	}

	getFeaturedLeader() : Leader {
		return LEADER.filter((featured_instance) => featured_instance.featured)[0];
	}
	
  constructor() { }
}
