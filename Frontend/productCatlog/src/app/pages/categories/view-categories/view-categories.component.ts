import { Component } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import Swal from 'sweetalert2';
import { ICATEGORY } from 'src/app/core/interfaces/category.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent {
  categories!:ICATEGORY[];
  constructor(private categoryService:CategoryService,private modalService:NgbModal){}
  ngOnInit(){
    this.getCategories()
  }
  getCategories(){
    this.categoryService.getAllCategories().subscribe((response)=>{
      // console.log(response);
      this.categories=response
    },(error)=>{
      Swal.fire('Oops',`${error.message}`,'error')
    })
  }
  openAddCategoryDialog(category: any){
    const modalRef = this.modalService.open(AddCategoriesComponent);
    modalRef.componentInstance.category = category;
    return modalRef.result;
  }
  }

