import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { WhishlistService } from 'src/app/core/services/whishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [CommonModule , RouterLink , CuttextPipe],
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent {


  constructor(
    private _WhishlistService:WhishlistService ,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService: ToastrService,
    ){}

  Products :Product[]=[];
  wishListData : string[] =[] ;



  ngOnInit(): void {

    this._WhishlistService.gitWishList().subscribe({
    next:(res)=>{
      console.log(res);
      this.Products = res.data;
      const newData = res.data.map((item : any)=> item._id )
      this.wishListData=newData;

    },
    error : (err)=>{
      console.log(err);

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

  addWishlist(id : string) : void {
    this._WhishlistService.addProductToWishList(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message);
        this.wishListData = res.data;
        // this._WhishlistService.wishlistNumber.next(this.wishListData.length);
        console.log( 'add' , res);

    },
    error:(err)=>{
        this._ToastrService.success(err.message);
    }
    })
  }


  removeFav(id : string):void {
    this._WhishlistService.removeItemFromWishList(id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message);
      this.wishListData = res.data;
      this._WhishlistService.wishlistNumber.next(this.wishListData.length);

      this._WhishlistService.gitWishList().subscribe({
        next:(response) =>{
          this.Products = response.data ;
        }
      })

      const newProductData = this.Products.filter((item:any) => this.wishListData.includes(item._id) )
      this.Products = newProductData ;

      // console.log(this.wishListData.length);
      this._WhishlistService.wishlistNumber.next(this.wishListData.length);
    },
    error:(err)=>{
    console.log(err);
    }
    })
  }

}
