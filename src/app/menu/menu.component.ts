import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from "../shared/dishes";
import { DishService } from "../services/dish.service";
import { baseURL } from "../shared/baseurl";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


    BASEURL : any;
	 dishes : Dish[];

   selectedDish : Dish ;


	 // selectedDish : Dish = DISHES[7];

  constructor( private dishService : DishService) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes );


      this.BASEURL = baseURL;
      console.log(baseURL);

    //
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }



}
