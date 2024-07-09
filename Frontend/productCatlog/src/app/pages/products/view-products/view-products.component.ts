import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IPRODUCT } from 'src/app/core/interfaces/product.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent {
  products!:IPRODUCT[]
  constructor(private productService:ProductService){}
  ngOnInit(){
    this.getProducts()
  }
  getProducts(){
    this.productService.getProducts().subscribe((response:any)=>{
      console.log(response)
      this.products=response
    },(error)=>{
      Swal.fire('Oops',`${error.message}`,'error')
    })
  }
}
