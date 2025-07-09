import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { WhishlistService } from 'src/app/core/services/whishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , RouterLink , CuttextPipe , NgxPaginationModule  , FormsModule  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor (private _ProductService:ProductService ,
    private _CartService:CartService ,
    private _ToastrService:ToastrService ,
    private _Renderer2:Renderer2,
    private _WhishlistService:WhishlistService
  ){}

  term:string = '' ;
  Products :Product[]=[];
  FiltersProducts :Product[]=[];
  pageSize:number = 0 ;
  currentPage:number = 1 ;
  total:number = 0 ;
  wishListData : string[] =[]


  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        // console.log( 'product', response);
        this.Products = response.data;
        this.FiltersProducts = this.Products;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;

      }
    })


    this._WhishlistService.gitWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((e : any)=> e._id )
        this.wishListData=newData;
      }
    })

  }

  // Search Products
  filterProducts(){
    this.FiltersProducts = this.Products.filter(product =>
      product.title.toLowerCase().includes(this.term.toLowerCase())
    );
  }

  addProduct(id:any , element:HTMLButtonElement):void {

    this._Renderer2.setAttribute(element , 'disabled' , 'true' );

    this._CartService.addToCart(id).subscribe({
      next:(response) => {

        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled');

        this._CartService.cartNumber.next( response.numOfCartItems);

      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }


  pageChanged(event:any):void {
    this._ProductService.getProducts(event).subscribe({
      next:(response)=>{

        this.Products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;

      }
    })
  }


  addWishlist(id : string) : void {
    this._WhishlistService.addProductToWishList(id).subscribe({
     next:(res)=>{
       this._ToastrService.success(res.message);
       this.wishListData = res.data;
       this._WhishlistService.wishlistNumber.next(this.wishListData.length)

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
       // console.log(res);
       // console.log(this.wishListData.length);
       this._WhishlistService.wishlistNumber.next(this.wishListData.length)
     },
     error:(err)=>{
     console.log(err);
     }
    })
   }


}
