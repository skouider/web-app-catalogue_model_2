import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,of} from 'rxjs';
import{catchError, map, startWith} from 'rxjs/operators'
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { ActionEvent, DataState, DataStateEnum, ProductActionsType } from 'src/app/state/product.state';

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

  onActionEvent($event:ActionEvent){
   
    switch($event.type){

      case ProductActionsType.GET_ALL_PRODUCTS : this.onGetAllProducts(); break;
      case ProductActionsType.GET_SELECTED_PRODUCTS : this.onSelectedProducts(); break;
      case ProductActionsType.GET_AVAILABE_PRODUCTS : this.onAvailableProducts(); break;
      case ProductActionsType.NEW_PRODUCT : this.onAddProducts(); break;
      case ProductActionsType.SEARCH_PRODUCTS : this.SearchProduct($event.payload); break;
      case ProductActionsType.DELETE_PRODUCT : this.onDelete($event.payload); break;
      case ProductActionsType.SELECT_PRODUCT : this.onSelected($event.payload); break;
      case ProductActionsType.EDIT_PRODUCT : this.onEdit($event.payload); break;



    }
    
  }
}
