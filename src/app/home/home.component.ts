import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   dish: Dish;
   leader_instance : Leader;
  promotion: Promotion;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice : LeaderService) { }

  ngOnInit() {
    this.dishservice.getDish('2')
      .subscribe(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader_instance => this.leader_instance = leader_instance);
  }

}
