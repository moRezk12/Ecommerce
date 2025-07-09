import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {


  baseUrl : string = `https://ecommerce.routemisr.com/api/v1/` ;

  wishlistNumber : BehaviorSubject<number> = new BehaviorSubject (0) ;

  
  constructor(private _HttpClient:HttpClient) {}

  addProductToWishList(prodId : string):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist` ,
    {
      productId: prodId
    })
  }

  gitWishList():Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`)
  }

  removeItemFromWishList(id : string):Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`)
  }
}
