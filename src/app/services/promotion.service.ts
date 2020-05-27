import { Injectable } from '@angular/core';
import { of , Observable } from "rxjs";
import { delay } from 'rxjs/operators';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise( resolve => {
    //   setTimeout(() => PROMOTIONS , 2000);
    // });
    //return Promise.resolve();
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0] , 2000);
    //   });
    
    //return Promise.resolve();
  }

  getFeaturedPromotion(): Observable<Promotion> {

    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //     setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]) , 2000);
    //   });
   // return Promise.resolve();
  }

  constructor() { }
}
