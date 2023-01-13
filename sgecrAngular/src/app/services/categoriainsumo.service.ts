import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaInsumoService {
  path = "https://sgecrspringboot-production.up.railway.app/"
  getCategoriaInsumos():any{
    return this.http.get(this.path +"categoriainsumo/all");
  }
  getCategoriaInsumoById(id:any):any{
    return this.http.get(this.path +"categoriainsumo/"+ id);
  }
  deleteCategoriaInsumoById(id:any):any{
    return this.http.delete(this.path +"categoriainsumo/eliminar/"+ id);
  }
   PostCategoriaInsumo(data:CategoriaInsumo):any{
    return this.http.post<CategoriaInsumo>(this.path +"categoriainsumo/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  constructor(private http:HttpClient) { }
}
interface CategoriaInsumo {
  "idcategoriainsumos": number,
  "nombrecategoria": string
}

