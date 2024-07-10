import { Component } from '@angular/core';
import { IPRODUCT } from 'src/app/core/interfaces/product.interface';
import { Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  constructor(private sanitizer: DomSanitizer, private userService: UserService, private router: Router, private productService: ProductService) { }
  @Input() product!: IPRODUCT;
  role!: string | null;
  
  ngOnInit() {
    this.getRole()
  }


  getSafeUrl(path: string): SafeUrl {
    let formattedPath = path.replace(/\\/g, '/');


    formattedPath = formattedPath.replace(/^.*src\/public\//, '');


    const baseUrl = 'http://localhost:8000/';
    const fullUrl = baseUrl + formattedPath;




    return this.sanitizer.bypassSecurityTrustUrl(fullUrl);
  }
  getRole() {
    this.role = this.userService.getRole();
  }
  editProduct() {
    this.router.navigate([`/layouts/product/updateProduct/${this.product._id}`])

  }
  deleteProduct() {
    this.productService.deleteProductById(this.product._id).subscribe((response: any) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }, (error) => {
      Swal.fire('Oops', `${error.message}`, 'error')
    })
  }
  viewProduct(){
    this.router.navigate([`/layouts/product/viewProduct/${this.product._id}`])
  }
}
