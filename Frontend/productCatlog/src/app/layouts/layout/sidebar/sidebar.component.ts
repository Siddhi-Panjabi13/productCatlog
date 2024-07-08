import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoriesComponent } from 'src/app/pages/categories/add-categories/add-categories.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  role:string|null='';
  constructor(private userService:UserService,private modalService: NgbModal){}
  ngOnInit(){
    this.role=this.userService.getRole();
  }
  openAddCategoryDialog(){
    const modalRef = this.modalService.open(AddCategoriesComponent);
    modalRef.result.then((result) => {
      if (result) {
        console.log('Category added:', result);
      }
    }, (reason) => {
      console.log('Dismissed:', reason);
    });
  }
  }

