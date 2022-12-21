import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsType } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!:Product
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  
  }
  
  onSelected(product:Product){
    this.productEventEmitter.emit({type:ProductActionsType.SELECT_PRODUCT,payload:product})

  }

  onDelete(product:Product){
    this.productEventEmitter.emit({type:ProductActionsType.DELETE_PRODUCT,payload:product})
  }

  onEdit(product:Product){
    this.productEventEmitter.emit({type:ProductActionsType.EDIT_PRODUCT,payload:product})
  }
}
