import { Component } from '@angular/core';
import { IPRODUCT } from 'src/app/core/interfaces/product.interface';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';
import { ICATEGORY } from 'src/app/core/interfaces/category.interface';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  
    productForm!: FormGroup;
    categories!:ICATEGORY[]
  
    constructor(private fb: FormBuilder,private categoryService:CategoryService) {}
  
    ngOnInit(): void {
      this.productForm = this.fb.group({
        productName: ['', Validators.required],
        description: ['', Validators.required],
        imageURL: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        categoryId: ['', Validators.required]

      });
      this.getCategory()
    }
  
    onSubmit(): void {
      if (this.productForm.valid) {
        const product: IPRODUCT = this.productForm.value;
        console.log('Product:', product);
      }
    }
    getCategory(){
      this.categoryService.getAllCategories().subscribe((response)=>{
        this.categories=response
      },(error)=>{
        Swal.fire('Oops',`${error.message}`,'error')
      })

      
    }
  }
  
