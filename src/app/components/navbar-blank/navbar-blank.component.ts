import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WhishlistService } from 'src/app/core/services/whishlist.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterLinkActive ],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css']
})
export class NavbarBlankComponent implements OnInit {

  constructor(private _Router:Router ,
    private _CartService:CartService ,
    private _Renderer2:Renderer2,
    private _WhishlistService:WhishlistService

    ){}

  @ViewChild('navBar') navElement!:ElementRef;

  @HostListener('window:scroll')
  onScroll(){
    if(scrollY > 300){
    this._Renderer2.addClass( this.navElement.nativeElement , 'px-5' );
    }
    else {
    this._Renderer2.removeClass( this.navElement.nativeElement , 'px-5' );
    }
  }

  cartNum: number = 0 ;
  wishListNumber: number = 0 ;


  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data) => {
        this.cartNum = data ;
      }
    });

    this._WhishlistService.wishlistNumber.subscribe({
      next:(data) => {
        this.wishListNumber = data ;
        console.log( 'whishdfgdgf' , data);

      }
    });


    this._CartService.getUserCart().subscribe({
      next:(response)=>{

        this.cartNum = response.numOfCartItems ;
      },

    })

    this._WhishlistService.gitWishList().subscribe({
      next:(response)=>{
        console.log( 'count' , response.data.length);
        this.wishListNumber = response.data.length ;
      },
    })



  }

  signOut():void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

}
