import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { of , Observable } from "rxjs";
import { delay } from 'rxjs/operators';
import { DISHES } from "../shared/dishes";


@Injectable({
  providedIn: 'root'
})
export class DishService {

	getDishes(): Observable<Dish[]>{
    //console.log("yum");  
    return of(DISHES).pipe(delay(2000));
    // return new Promise( resolve =>{
    //    setTimeout(() => resolve(DISHES), 2000);
    //  });
		//return Promise.resolve(DISHES);
	}

	getDish(id: string): Observable<Dish> {

      return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
   //  	return new Promise(resolve => {
   //       setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
        
  	// });
    }

  	getFeaturedDish(): Observable<Dish> {
      return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    	// return new Promise(resolve => {
     //    setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]) , 2000);
     //  });
  	}

  constructor() { }
}
