import { Component, OnInit , ViewChild  } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import {MatSliderModule} from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

   dishIds: string[];
  prev: string;
  next: string;
	dish: Dish;
  star_val : number;

  myDate = new Date();
  //commentForm: FormGroup;
  commentForm: FormGroup;


  @ViewChild('fform') commentFormDirective;

  new_comment = {
    'rating': 0,
    'comment': '',
    'author': '',
    'date': ''
  };


  commentErrors = {
    'Name': '',
    'comment': ''
  };

  validationMessages = {
    'Name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.'
    },
    'comment': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.'
    },
  };



  constructor(private fb: FormBuilder,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) {
      this.createForm();
     }


  ngOnInit() {


    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }


  createForm() {
    //console.log("help");
     this.commentForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(2)] ],
      rating : ['' , Validators.required],
      comment: ['', [Validators.required, Validators.minLength(2)] ],
    });


     this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    //this.onValueChanged();


  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.commentErrors) {
      //console.log(field);
      if (this.commentErrors.hasOwnProperty(field)) {
        //console.log("asd");
        // clear previous error message (if any)
        this.commentErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              //console.log(key);
              this.commentErrors[field] += messages[key] + ' ';
            }
          }
        }

        
      }
    }
  }

  setPrevNext(dishId: string) {
    
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }


  
  onSubmit(){
    
      this.new_comment.author = this.commentForm.value.Name;
      this.new_comment.comment = this.commentForm.value.comment;
      this.new_comment.date = this.myDate.toDateString();
      this.new_comment.rating = this.commentForm.value.rating;
      //console.log(this.star_val);


      this.dish.comments.push(this.new_comment);

      this.commentForm.reset({
        Name : '' ,
        rating : 0,
        comment : ''
      });

      this.commentFormDirective.resetForm();

  }

}
