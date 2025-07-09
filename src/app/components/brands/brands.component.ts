import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/core/interfaces/category';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands : Category [] =[]

  constructor (private _ProductsService:ProductService){}
  
  ngOnInit(): void {

    this._ProductsService.prand().subscribe({
      next:(res)=>{
      console.log(res);
      this.brands = res.data
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }

}
