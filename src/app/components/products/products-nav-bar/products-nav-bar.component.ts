import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { ActionEvent, ProductActionsType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

 @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.GET_ALL_PRODUCTS,payload:null})
  }

  onSelectedProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.GET_SELECTED_PRODUCTS,payload:null})
  }

  onAvailableProducts(){
    this.productEventEmitter.emit({type:ProductActionsType.GET_AVAILABE_PRODUCTS,payload:null})
  }

  onAddProducts(){
   this.productEventEmitter.emit({type:ProductActionsType.NEW_PRODUCT,payload:null})
  }

  SearchProduct(fvalue:any){
    this.productEventEmitter.emit({type:ProductActionsType.SEARCH_PRODUCTS,payload:fvalue})
  }

}
