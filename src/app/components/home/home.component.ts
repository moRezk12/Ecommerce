import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/core/interfaces/category';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { WhishlistService } from 'src/app/core/services/whishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , CuttextPipe , CarouselModule , RouterLink , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private _ProductService:ProductService ,
    private _CartService:CartService ,
    private _ToastrService:ToastrService ,
    private _Renderer2:Renderer2,
    private _WhishlistService:WhishlistService
    ){}
  Products :Product[]=[];
  filteredProducts :Product[]=[];
  categories :Category[]=[];
  wishListData : string[] =[] ;
  term:any = '' ;


  ngOnInit(): void {

    this._ProductService.getProducts().subscribe({
      next:(Response)=>{
        console.log(Response);
        this.Products=Response.data;
        this.filteredProducts= this.Products;

      }
    })



    this._ProductService.getCategories().subscribe({
      next:(Response)=>{
        console.log(Response);
        this.categories = Response.data;

      }
    })

    this._WhishlistService.gitWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((item : any)=> item._id )
        this.wishListData=newData;
      }
    })


  }

    // تحديث قائمة المنتجات عند البحث
    filterProducts() {
      console.log(this.term);

      this.filteredProducts = this.Products.filter(product =>
        product.title.toLowerCase().includes(this.term.toLowerCase())
      );
    }

  addProduct(id:any , element:HTMLButtonElement):void {

    this._Renderer2.setAttribute(element , 'disabled' , 'true' );

    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response);
        // if(response.numOfCartItems === response.numOfCartItems){
        //   this._ToastrService.warning("Product already in cart");
        //   return ;
        // }
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');

        this._CartService.cartNumber.next( response.numOfCartItems);
        console.log(response.numOfCartItems);




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
        this._WhishlistService.wishlistNumber.next(this.wishListData.length);
        console.log(' daat' , this.wishListData.length);


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
     },
     error:(err)=>{
     console.log(err);
     }
    })
   }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true ,
    autoplayTimeout: 3000 ,
    autoplaySpeed: 1000 ,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true ,
    autoplayTimeout: 3000 ,
    autoplaySpeed: 1000 ,
    navText: ['', ''],
    items:1,
    nav: false
  }

}
