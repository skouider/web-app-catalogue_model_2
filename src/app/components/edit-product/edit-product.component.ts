import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!:number
  editFormGroup!:FormGroup
  submitted:boolean = false
  

  constructor(private active:ActivatedRoute,private service:ProductsService,private fb:FormBuilder) {
    this.productId = this.active.snapshot.params['id']
   }

  ngOnInit(): void {
    this.service.getProduct(this.productId).subscribe(product=>{
      
      this.editFormGroup = this.fb.group({
        id :[product.id,Validators.required],
        name :[product.name,Validators.required],
        price :[product.price,Validators.required],
        quantity :[product.quantity,Validators.required],
        selected :[product.selected,Validators.required],
        available:[product.available,Validators.required]
      })
    },
    err=>{
      console.log(err);
      
    })

  }

  onEditProduct(){
    this.service.edit(this.editFormGroup.value).subscribe(data=>{
      console.log(data);
      
    },err=>{
      console.log(err);
      
    })
  }

}
