import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


	getLeaders(): Promise<Leader[]>  {
		return new Promise( resolve => {
			setTimeout(() => resolve(LEADER) , 2000);
		});
	}

	getFeaturedLeader() : Promise<Leader> {
		return new Promise( resolve => {
			setTimeout(() => resolve(LEADER.filter((featured_instance) => featured_instance.featured)[0]) , 2000);
		});
		
	}
	
  constructor() { }
}
