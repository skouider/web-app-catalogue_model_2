export enum DataStateEnum{
    LOADED,LOADING,ERROR
}

export interface DataState<T>{
  
    dataState?:DataStateEnum,
    Data?:T,
    errorMessage?:string


}