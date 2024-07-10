import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { IPRODUCT } from 'src/app/core/interfaces/product.interface';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/core/services/category.service';
import { ICATEGORY } from 'src/app/core/interfaces/category.interface';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent {
  products!: IPRODUCT[];
  query: string = '';
  categories!:ICATEGORY[];
  categoryName: string = '';
  minPrice: number|undefined=undefined ;
  maxPrice: number|undefined=undefined ;
  selectedPriceRange: string = '';
  constructor(private productService: ProductService, private categoryService:CategoryService) {}
  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
  const filters={
    query: this.query.trim(),
    categoryName: this.categoryName,
    minPrice:this.minPrice,
    maxPrice:this.maxPrice
  }
    this.productService.getProducts(filters).subscribe(
      (response: any) => {
        this.products = response;
      },
      (error) => {
        // console.log(error)
        Swal.fire('Oops', `${error.error}`, 'error');
        this.products=[]
      }
    );
  }
  search(): void {
    this.getProducts();
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe((response:any)=>{
      this.categories=response
    },(error:any)=>{
      Swal.fire('Oops', `${error.error}`, 'error');
      this.categories=[]
    })
  }
  onCategoryChange(): void {
    this.getProducts()
  }
  onPriceRangeChange(): void {
    if (this.selectedPriceRange) {
      const [min, max] = this.selectedPriceRange.split('-').map(Number);
      this.minPrice = isNaN(min) ? undefined : min;
      this.maxPrice = isNaN(max) ? undefined : max;
    } 
    this.getProducts();
  }
}
