import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private  _ActivatedRoute:ActivatedRoute,private _CartService:CartService){}

  cartId:any = '' ;

  orderForm : FormGroup =new FormGroup ({
    details : new FormControl(''),
    phone : new FormControl(''),
    city : new FormControl(''),
  })

  handelForm():void {
    console.log(this.orderForm.value);
    this._CartService.checkOut(this.cartId , this.orderForm.value).subscribe({
      next:(response)=>{
        // console.log(res.status);
        if(response.status == "success"){
          window.open(response.session.url)
          // this.spinner =false;
        }
      },
      error:(err)=>{
        // this.spinner =false;
      }
    });

  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
      this.cartId= parms.get('id')
      console.log(this.cartId);

      }
    })


  }

}
