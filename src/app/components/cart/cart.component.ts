import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( private _CartService:CartService, private _Renderer2:Renderer2  ){}

  cartDetails:any=null;

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response) => {
        console.log(response.data);
        this.cartDetails = response.data ;

      }
    })
  }

  removeItem(id:string , element:HTMLButtonElement):void {

    this._Renderer2.setAttribute(element , 'disabled' , 'true' );

    this._CartService.removeCartItem(id).subscribe({
      next:(response) => {
        console.log(response);
        this.cartDetails = response.data ;
        this._Renderer2.removeAttribute(element , 'disabled' );
        this._CartService.cartNumber.next(response.numOfCartItems);

      },
      error:(err) =>{
        this._Renderer2.removeAttribute(element , 'disabled' );
      }
    })
  }

  changeCount( count:number , id:string , el1:HTMLButtonElement , el2:HTMLButtonElement ):void {

    if(count >= 1){

      this._Renderer2.setAttribute(el1 ,'disabled' , 'true');
      this._Renderer2.setAttribute(el2 ,'disabled' , 'true');

      this._CartService.updateCartCount(count , id).subscribe({
        next:(response)=>{
          this.cartDetails=response.data;
          this._Renderer2.removeAttribute(el1 ,'disabled');
          this._Renderer2.removeAttribute(el2 ,'disabled');
        },
        error : (err)=>{
          this._Renderer2.removeAttribute(el1 ,'disabled');
          this._Renderer2.removeAttribute(el2,'disabled');
        }
      })
    }

  }

  clear():void {
    this._CartService.ClearCart().subscribe({
      next:(response)=>{
        if(response.message=="success"){
          this.cartDetails = null
        this._CartService.cartNumber.next(0);

        }

      }
    })
  }

}
