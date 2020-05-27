import { Injectable } from '@angular/core';
import { Dish } from "../shared/dish";
import { DISHES } from "../shared/dishes";


@Injectable({
  providedIn: 'root'
})
export class DishService {

	getDishes(): Promise<Dish[]>{
    //console.log("yum");  
		return Promise.resolve(DISHES);
	}

	getDish(id: string): Promise<Dish> {
    	return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);//here dish is var named by us :)
  	}

  	getFeaturedDish(): Promise<Dish> {
    	return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  	}

  constructor() { }
}
