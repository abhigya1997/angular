import { Component, OnInit , ViewChild  } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import {MatSliderModule} from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { baseURL } from "../shared/baseurl";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { visibility , flyInOut ,expand} from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  styleUrls: ['./dishdetail.component.scss'],
    animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  errMess : string ;
  BASEURL : any ;
   dishIds: string[];
  prev: string;
  next: string;
	dish: Dish;
  star_val : number;
  visibility = 'shown';

  myDate = new Date();
  //commentForm: FormGroup;
  commentForm: FormGroup;
  dishcopy: Dish;

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
      this.BASEURL = baseURL;
     }


  ngOnInit() {


    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds,
        errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']);}))
      .subscribe(dish => {  this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);this.visibility = 'shown'; });
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


      this.dishcopy.comments.push(this.new_comment);

       this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });

      this.commentForm.reset({
        Name : '' ,
        rating : 0,
        comment : ''
      });

      this.commentFormDirective.resetForm();

  }

}
