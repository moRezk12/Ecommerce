import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule , CarouselModule , ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute ,
    private _ProductService:ProductService ,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService

    ){}
  productId:string | null= '' ;
  productDetails:any = null ;
  wishListData : string[] =[] ;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms) => {
        this.productId=parms.get('id');
        console.log(this.productId);

      }
    })

    this._ProductService.getProductDetails(this.productId).subscribe({
      next:({data})=>{
        this.productDetails= data;
        // console.log(this.productDetails);
        console.log(data);

      }
    })




  }

  addProduct(id:any , element:HTMLButtonElement):void {

    this._Renderer2.setAttribute(element , 'disabled' , 'true' );

    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');

        this._CartService.cartNumber.next( response.numOfCartItems);

      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1 ,
    nav: false
  }

}
