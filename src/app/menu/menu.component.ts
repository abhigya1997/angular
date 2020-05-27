import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from "../shared/dishes";
import { DishService } from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


	 dishes : Dish[];

   selectedDish : Dish ;

	 // selectedDish : Dish = DISHES[7];

  constructor( private dishService : DishService) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);

    //console.log("yummy");
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
