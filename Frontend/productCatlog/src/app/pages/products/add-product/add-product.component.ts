import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';
import { ICATEGORY } from 'src/app/core/interfaces/category.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm!: FormGroup;
  categories!: ICATEGORY[];
  selectedFile: File | null = null; 
  isUpdate:boolean =false;
  isSubmit:boolean=true;
  productId = this.activatedRoute.snapshot.paramMap.get('id') as string;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService: ProductService, private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      imageURL: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]

    });
    this.getCategory()
      if (this.productId) {
        this.isUpdate = true;
        this.isSubmit = false;
        this.getProductById();
        this.productForm.get('imageURL')?.clearValidators();
        this.productForm.get('imageURL')?.updateValueAndValidity();
      }
  }
  fileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      var formData: any = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('imageURL', this.selectedFile as File);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      console.log(this.productForm.value)
      if(this.isSubmit){
        this.productService.createProduct(formData).subscribe((response:any) => {
          Swal.fire('Good Job', `${response.message}`, 'success');
          this.router.navigate(['/layouts/product/getProducts'])

        }, (error) => {
          // console.log(error)
          Swal.fire('Oops', `${error.message}`, 'error')
        })
      }
      else{
        this.productService.updateProductById(this.productId,formData).subscribe((response:any)=>{
          Swal.fire('Good Job', `${response.message}`, 'success');
          this.router.navigate(['/layouts/product/getProducts'])
        },(error)=>{
          console.log(error)
          Swal.fire('Oops', `${error.message}`, 'error')
        })
      }
      }
      
  }
  getCategory() {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response
    }, (error) => {
      Swal.fire('Oops', `${error.message}`, 'error')
    })

  }
  getProductById(){
    this.productService.getProductById(this.productId).subscribe((response:any)=>{
      console.log(response)
      this.productForm.patchValue({
        productName: response.productName,
        description:response.description,
        price:response.price,
        category:response.categoryId
      });

    },(error)=>{
      Swal.fire('Oops',`${error.message}`,'error');
    })
  }

}

