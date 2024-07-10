import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPRODUCT } from 'src/app/core/interfaces/product.interface';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICATEGORY } from 'src/app/core/interfaces/category.interface';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  product: IPRODUCT | null = null;
  productId: string=this.route.snapshot.paramMap.get('id') as string;
  category!:ICATEGORY;
  constructor(private route:ActivatedRoute,private location: Location,private productService:ProductService,private sanitizer:DomSanitizer,private categoryService:CategoryService){}
  ngOnInit(){
    this.getProduct()
    // this.getCategory()
  }
  getProduct(){
    this.productService.getProductById(this.productId).subscribe((response:any)=>{
      this.product=response
      this.categoryService.getCategoryById(this.product?.categoryId).subscribe((response:any)=>{
        this.category=response
        console.log(this.category)
      },(error)=>{
        Swal.fire('Oops',`${error.message}`,'error');
      })
    },(error)=>{
      Swal.fire('Oops',`${error.message}`,'error')
    })
  }
  goBack(): void {
    this.location.back();
  }
  getSafeUrl(path: string): SafeUrl {
    let formattedPath = path.replace(/\\/g, '/');


    formattedPath = formattedPath.replace(/^.*src\/public\//, '');


    const baseUrl = 'http://localhost:8000/';
    const fullUrl = baseUrl + formattedPath;




    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
  
  //   // const categoryId=new ObjectId(this.product?.categoryId)

  

}
