import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  path = "https://sgecrspringboot-production.up.railway.app/"
 
  getProductosById(id: number) {
    return this.http.get(this.path +"producto/" + id);
  }
  getProductos():any{
    return this.http.get(this.path +"producto/all");
  }
  deleteProductoById(id:any):any{
    return this.http.delete(this.path +"producto/eliminar/"+id).subscribe((x)=>{
      console.log(x);
      
    })
  }
   PostProducto(data:Producto):any{
    return this.http.post<Producto>(this.path +"producto/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  PostListProductos(data:any[]):any{
    return this.http.post<Producto>(this.path +"pedido/lista/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
constructor(private http:HttpClient) { }
}
interface Producto{
  "idproducto": number,
  "nombreproducto": string,
  "descripcionproducto": string,
  "ingredientesproducto": string,
  "valorproducto": number,
  "fk_categoriaproductos":number
}
