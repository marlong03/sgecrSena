import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {
  path = "https://sgecrspringboot-production.up.railway.app/"
  getCategoriaProductos():any{
    return this.http.get(this.path +"categoriaproducto/all");
  }
  getCategoriaProductoById(id:any):any{
    return this.http.get(this.path +"categoriaproducto/"+ id);
  }
  deleteCategoriaProductoById(id:any):any{
    return this.http.delete(this.path +"categoriaproducto/eliminar/"+ id);
  }
 
   PostCategoriaProducto(data:CategoriaProducto):any{
    return this.http.post<CategoriaProducto>(this.path +"categoriaproducto/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  constructor(private http:HttpClient) { }
}
interface CategoriaProducto {
  "idCategoriaproducto": number,
  "nombreCategoriaProducto": string,
}
