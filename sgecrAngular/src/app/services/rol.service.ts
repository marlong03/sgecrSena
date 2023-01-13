import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  path = "https://sgecrspringboot-production.up.railway.app/"
    getRoles():any{
      return this.http.get(this.path +"rol/all");
    }
  constructor(private http:HttpClient) { }
}
interface Rol  {
  "idrol": number,
  "nombrerol": string
}
