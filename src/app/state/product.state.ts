
export enum ProductActionsType{
GET_ALL_PRODUCTS = "[Product] Get All Product",
GET_SELECTED_PRODUCTS = "[Product] Get Selected Product",
GET_AVAILABE_PRODUCTS = "[Product] Get Available Product",
SEARCH_PRODUCTS = "[Product] Search Product",
NEW_PRODUCT = "[Product] Add New Product",
SELECT_PRODUCT = "[Product] Select Product",
DELETE_PRODUCT = "[Product] Delete Product",
EDIT_PRODUCT = "[Product] Edit Product",
PRODUCT_SAVED = "[Product] Product Saved",
PRODUCT_UPDATED = "[Product] Product Updated"
}

export interface ActionEvent{
    type:ProductActionsType,
    payload?: any

}

export enum DataStateEnum{
    LOADED,LOADING,ERROR
}

export interface DataState<T>{
  
    dataState?:DataStateEnum,
    Data?:T,
    errorMessage?:string


}