import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  baseUrl : string =`https://ecommerce.routemisr.com/api/v1/`;
  
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0) ;



  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `cart`,
    {
      productId: prodId
    })
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `cart`)
  }

  removeCartItem(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}`)
  }

  updateCartCount(countNum : number,prodId:string ):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${prodId}`,
    {
      count : countNum,
    })
  }


  ClearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart`)
  }

  checkOut(cartId : string ,orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +
      `orders/checkout-session/${cartId}?url=http://localhost:4200/`,
      {
        shippingAddress: orderInfo
      }
    )}

}
