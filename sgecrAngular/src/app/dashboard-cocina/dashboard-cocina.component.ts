import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-dashboard-cocina',
  templateUrl: './dashboard-cocina.component.html',
  styleUrls: ['./dashboard-cocina.component.css']
})
export class DashboardCocinaComponent implements OnInit {
  usuarioSesion =  JSON.parse(localStorage.getItem("usuario") || "[]")
  idDomiciliario:number = 0;
  displayon = 'none';
  displayPedidosDomiciliario = "block";
  displayEditarPerfil = "none";
  abrirComponenteEditarPerfil(){
    this.displayPedidosDomiciliario = "none";
    this.displayEditarPerfil = "block";
  }
  cerrarNavbar(event:any){
    let palabra = event.path[0].childNodes[0].data;
    if(palabra.toLowerCase() == 'pedidos pendientes' 
        || palabra.toLowerCase() == 'pedidos entregados' ){
      this.displayEditarPerfil = "none";
      this.displayPedidosDomiciliario = "block";
    }
    if(this.displayon == 'block'){
      this.displayon = 'none';
    }
    else if(this.displayon == 'none'){
      this.displayon = 'block';
    }
  }
  ejecutarNavbar(){
    if(this.displayon == 'block'){
      this.displayon = 'none';
    }
    else if(this.displayon == 'none'){
      this.displayon = 'block';
    }
  }
  cerrarSesion(){
    Swal.fire(
      'Cerraste sesion',
      '¡Nos vemos pronto!',
      'success'
      ).then((x)=>{
      localStorage.removeItem('usuario')
      this.router.navigate(['/'])
    })
  }
  constructor(private pedidoService:PedidoService,
    private router:Router,
    private cd:ChangeDetectorRef ) { }
  ngOnInit(): void {
    if(localStorage.getItem('usuario') == null){
      this.router.navigate([''])
    }else{
      let user = JSON.parse(localStorage.getItem('usuario') || "[]")
      if(user.codigoempresarial.toLowerCase() == "coci"){

        this.router.navigate(['dashboardCocina'])
      }else{
        this.router.navigate([''])
      }
    }
  }
  ngAfterViewInit(): void { 
    this.cd.detectChanges()
  }

}
