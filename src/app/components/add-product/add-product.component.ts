import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { EventDriverService } from 'src/app/service/event-driver.service';
import { ProductsService } from 'src/app/service/products.service';
import { ProductActionsType } from 'src/app/state/product.state';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFormGroup!: FormGroup 
  submitted:boolean = false
 

  constructor(private fb:FormBuilder,
    private productService:ProductsService,
    private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
      this.productFormGroup = this.fb.group({
      name:['',Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]      
    })
  
  }

  onSaveProduct(){
      this.submitted = true
      if(this.productFormGroup.invalid) return;
        this.productService.save(this.productFormGroup.value)
        .subscribe(data=>{
            this.eventDrivenService.publishEvent({type:ProductActionsType.PRODUCT_SAVED})
          alert('success')
          console.log(data);
          
        },err=>{
          console.log(err);
          
        })
  }
}
