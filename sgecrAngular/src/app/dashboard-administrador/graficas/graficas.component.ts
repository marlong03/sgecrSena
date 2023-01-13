import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  constructor(private pedidoService:PedidoService) {
 
     pedidoService.getPedidos().subscribe((pedidos:any)=>{
      let listaPedidosPendientes = []
      let listaPedidosEntregados = []
      let listaPedidosCancelados = []
      let listaPedidosEnviados = []
      for(let pedido of pedidos){
        if(pedido.estadopedido.toLowerCase() == "enviado"){
          listaPedidosEnviados.push("")
        }
        if(pedido.estadopedido.toLowerCase() == "pendiente"){
          listaPedidosPendientes.push("")
        }
        if(pedido.estadopedido.toLowerCase() == "entregado"){
          listaPedidosEntregados.push("")
        }
        if(pedido.estadopedido.toLowerCase() == "cancelado"){
          listaPedidosCancelados.push("")
        }
      }
      let single = [
        {
          "name": "Pendientes",
          "value":listaPedidosPendientes.length,
        },
        {
          "name": "Entregados",
          "value": listaPedidosEntregados.length
        },
        {
          "name": "Enviados",
          "value": listaPedidosEnviados.length
        },
        {
          "name": "Cancelados",
          "value": listaPedidosCancelados.length
        }
      ];
      this.singleFuera = single
       Object.assign(this, { this: this.singleFuera });
      })
   }
   singleFuera:any = []
  listaPedidos:any = []
  
  @Input() tituloSectionInput :string = "";
  llenarGrafica(){
  }
  view: any = [900, 300];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  traerPedidosPorEstado(e:string){
    let estado =  e.toLowerCase()
    this.pedidoService.getPedidos().subscribe((pedidos:any)=>{
      for(let p of pedidos){
        if(p.estadopedido == estado){
          this.listaPedidos.push(p)
        }
      }
    })
  }
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }
  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
  }
}
