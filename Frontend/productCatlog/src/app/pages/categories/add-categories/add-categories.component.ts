import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Input } from '@angular/core';
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {
  categoryForm!: FormGroup;
  isUpdate: boolean = false;
  isSubmit: boolean = true;
  @Input() category: any;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, public activeModal: NgbActiveModal) {
    this.categoryForm = this.fb.group({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }
  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
      this.isUpdate = true;
      this.isSubmit = false
    }
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      if (this.isSubmit) {
        this.categoryService.createCategory(this.categoryForm.value).subscribe((response) => {
          Swal.fire('Good Job', `${response.message}`, 'success')
          this.activeModal.close(this.categoryForm.value);
        },
          (error) => {
            Swal.fire('Oops', `${error.message}`, 'error')

          }
        )
      }
      else{
        this.categoryService.updateCategory(this.category._id,this.categoryForm.value).subscribe((response)=>{
          Swal.fire('Good Job',`${response.message}`,'success');
        },(error)=>{
          Swal.fire('Oops', `${error.message}`, 'error')

        })
      }
    }
  }
}
