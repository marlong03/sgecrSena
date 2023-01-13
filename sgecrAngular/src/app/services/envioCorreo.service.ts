import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class envioCorreoService {
  path = "https://sgecrspringboot-production.up.railway.app/"

  PostCorreo(correo:string,data:any):any{
    console.log(correo , data);
    
    return this.http.post("https://formsubmit.co/ajax/"+correo,data).subscribe((x:any) => {
      console.log(x)
    });
  }
  constructor(private http:HttpClient) { }
}

