import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


	getLeaders(): Promise<Leader[]>  {
		return Promise.resolve(LEADER);
	}

	getFeaturedLeader() : Promise<Leader> {
		return Promise.resolve(LEADER.filter((featured_instance) => featured_instance.featured)[0]);
	}
	
  constructor() { }
}
