import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  path = "https://sgecrspringboot-production.up.railway.app/"
  getInsumos():any{
    return this.http.get(this.path +"insumo/all");
  }
  getInsumoById(id:any):any{
    return this.http.get(this.path +"insumo/"+id);
  }
  deleteInsumoById(id:any):any{
    return this.http.delete(this.path +"insumo/eliminar/"+id);
  }
 
   PostInsumo(data:Insumo):any{
    return this.http.post<Insumo>(this.path +"insumo/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  PostListInsumos(data:any[]):any{
    return this.http.post<Insumo>(this.path +"insumo/lista/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  constructor(private http:HttpClient) { }
}
interface Insumo{
    "idinsumo": number,
    "nombreinsumo": string,
    "cantidadinsumo": number,
    "unidadinsumo": string,
    "valortotalinsumo":number,
    "estadoinsumo":string,
    "categoriainsumos_idcategoriainsumos": number,
    "valorunitarioinsumo":number,
    "fechaingresoinsumo":Date
}

