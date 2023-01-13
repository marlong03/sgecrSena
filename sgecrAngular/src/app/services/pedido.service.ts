import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  path = "https://sgecrspringboot-production.up.railway.app/"
  getPedidos():any{
    return this.http.get(this.path +"pedido/all");
  }
  getPedidoPorReferencia(referencia:string):any{
    return this.http.get(this.path +"pedido/referencia/"+ referencia);
  }
  asignarDomiciliario(referencia:any,nombreDomiciliario:any):any{
      this.http.get(this.path +"pedido/asignardomiciliario/" + referencia.replace(/ /g,'') + "/" + nombreDomiciliario).subscribe((z:any)=>{
        console.log(z);
      });
  } 
  cancelarPedido(referencia:any){
    this.http.get(this.path +"pedido/cancelarpedido/" + referencia.replace(/ /g,'')).subscribe((z:any)=>{
        console.log(z);
      });
  }
  enviarPedido(referencia:any){
    this.http.get(this.path +"pedido/enviarpedido/" + referencia.replace(/ /g,'')).subscribe((z:any)=>{
        console.log(z);
      });
  }
  cambiarEstadoPedido(referencia:string,estado:string){
    this.http.get(this.path +"pedido/estado/" + referencia.replace(/ /g,'') + "/" + estado).subscribe((z:any)=>{
        console.log(z);
      });
  }
   PostPedido(data:Pedido):any{
    return this.http.post<Pedido>(this.path +"pedido/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  PostListPedidos(data:any[]):any{
    return this.http.post<Pedido>(this.path +"pedido/lista/new",data).subscribe((x:any) => {
      console.log(x)
    });
  }
  constructor(private http:HttpClient) { }
}
interface Pedido{
    "idpedido": number,
    "referenciapedido": string,
    "descripcionpedido": string,
    "telefonopedido": string,
    "destinopedido": string,
    "detalledestinopedido": string,
    "valorpedido": number,
    "observacionpedido": string,
    "fk_idusuario": number,
    "estadopedido": string,
    "fechapedido": Date,
    "fk_iddomiciliario": number
}