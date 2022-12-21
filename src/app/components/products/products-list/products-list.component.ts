import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, DataState, DataStateEnum, ProductActionsType } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$?:Observable<DataState<Product[]>>
  readonly DataStateEnum = DataStateEnum;

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  onSelected(p:Product){
    
     this.productEventEmitter.emit({type:ProductActionsType.SELECT_PRODUCT,payload:p})
  }

  onDelete(p:Product){
    this.productEventEmitter.emit({type:ProductActionsType.DELETE_PRODUCT,payload:p})
  }

  onEdit(p:Product){
    this.productEventEmitter.emit({type:ProductActionsType.EDIT_PRODUCT,payload:p})
  }

  onActionEvent($event:ActionEvent){
    this.productEventEmitter.emit($event) 
    }
  }

