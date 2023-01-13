import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  path = "https://sgecrspringboot-production.up.railway.app/"
    getUsuarios():any{
      return this.http.get(this.path +"usuario/all");
    }
    deleteUsuarioById(id:number):any{
      return this.http.delete(this.path +"usuario/eliminar/"+id).subscribe((x)=>{
      })
    }
    getDomiciliarios():any{
      return this.http.get(this.path +"usuario/domiciliarios");
    }
    getDomiciliariosDisponibles():any{
      return this.http.get(this.path +"usuario/domiciliarios/disponibles");
    }
    getUsuarioByNombre(nombre:string):any{
      return this.http.get(this.path +"usuario/nombre" +'/' + nombre);
    }
    validarUsuario(email:any,password:any):any{
      return this.http.get(this.path +"usuario/" + email + "/" + password);
    }
     PostUsuario(data:Usuario):any{
      return this.http.post<Usuario>(this.path +"usuario/new",data).subscribe((x:any) => {
      });
    }
  constructor(private http:HttpClient) { }
}
interface Usuario{
  "idusuario": number,
  "nombreusuario": string,
  "telefonousuario": string,
  "emailusuario": string,
  "contrasenausuario": string,
  "estadousuario": number,
  "codigoempresarial": string,
  "direccionusuario": string ,
  "roles_idrol": number
  }

