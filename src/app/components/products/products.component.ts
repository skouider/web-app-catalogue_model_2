import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,of} from 'rxjs';
import{catchError, map, startWith} from 'rxjs/operators'
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { DataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?:Observable<DataState<Product[]>>
   readonly DataStateEnum = DataStateEnum;

  constructor(private service:ProductsService,private router:Router) { }

  ngOnInit(): void {

  }

  onGetAllProducts(){
    this.products$ = this.service.getAllProducts().pipe(
      map(
        (data)=>({dataState:DataStateEnum.LOADED,Data:data})),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errormessage:err.message}))
    );
  }
  onSelectedProducts(){
    this.products$ = this.service.getSelectedProducts().pipe(
      map(
        (data)=>({dataState:DataStateEnum.LOADED,Data:data})),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errormessage:err.message}))
    );
  }

  onAvailableProducts(){
     this.products$ = this.service.getAvailableProducts().pipe(
      map(
        (data)=>({dataState:DataStateEnum.LOADED,Data:data})),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errormessage:err.message}))
    );
  }

  SearchProduct(name:any){
    this.products$ = this.service.searchProducts(name.keyword).pipe(
      map(
        (data)=>({dataState:DataStateEnum.LOADED,Data:data})),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errormessage:err.message}))
    );
    
  }

  onSelected(p:Product){
    this.service.select(p).subscribe(data=>{
      p.selected = data.selected
    })    
  }

  onDelete(p:Product){
    let conf = confirm('Are U Sure?????')

    if(conf == false) return;
    
    this.service.deleteProduct(p).subscribe(data=>{
          this.onGetAllProducts()    
    })
  }

  onAddProducts(){
    this.router.navigateByUrl('/newProduct')
  }

  onEdit(p:Product){
    this.router.navigateByUrl('/editProduct/'+p.id)


  }
}
