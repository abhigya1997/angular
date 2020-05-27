import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { of , Observable } from "rxjs";
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


	getLeaders(): Observable<Leader[]>  {
		return of(LEADER).pipe(delay(2000));
		// return new Promise( resolve => {
		// 	setTimeout(() => resolve(LEADER) , 2000);
		// });
	}

	getFeaturedLeader() : Observable<Leader> {
		return of(LEADER.filter((featured_instance) => featured_instance.featured)[0]).pipe(delay(2000));
		// return new Promise( resolve => {
		// 	setTimeout(() => resolve(LEADER.filter((featured_instance) => featured_instance.featured)[0]) , 2000);
		// });
		
	}
	
  constructor() { }
}
