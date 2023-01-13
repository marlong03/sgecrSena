import { Component, OnInit,ViewChild,Inject, Input, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-registro-pedidos-principal',
  templateUrl: './registro-pedidos-principal.component.html',
  styleUrls: ['./registro-pedidos-principal.component.css']
})
export class RegistroPedidosPrincipalComponent implements OnInit {


  seleccionarDomiciliario:string = "";
  tieneDomiciliario:any = false;
  listaPedidos : Pedido[] = [];
  listaPedidosDataSource:any = [];
  listaDomiciliariosDisponibles:any = [];
  @Input() tituloSectionInput :string = "";

  displayedColumnsPedido:string[] = [
    'referenciapedido',
    'descripcionpedido',
    'telefonopedido',
    'observacionpedido',
    'destinopedido',
    'detalledestinopedido',
    'valorpedido',
    'fk_iddomiciliario',
    'accion'
  ];

  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  llenarTablaPedidos(op:string){
   if(op =="cancelado" || op == "enviado" || op == "entregado"){
    this.displayedColumnsPedido = [
      'referenciapedido',
      'descripcionpedido',
    'telefonopedido',
      'observacionpedido',
      'destinopedido',
      'detalledestinopedido',
      'valorpedido',
      'fechapedido',
      'fk_iddomiciliario',
    ];
   }else{
    this.displayedColumnsPedido = [
      'referenciapedido',
      'descripcionpedido',
    'telefonopedido',
      'observacionpedido',
      'destinopedido',
      'detalledestinopedido',
      'valorpedido',
      'fk_iddomiciliario',
      'accion'
    ];
   }
    this.pedidoService.getPedidos().subscribe((pedidos:any)=>{
      let subListaPedidos = [];
      for(let pedido of pedidos){
        if(pedido.estadopedido.toLowerCase() == (op).toLowerCase()){
          subListaPedidos.unshift(pedido);
        }
      }
      this.listaPedidos = subListaPedidos;
     this.listaPedidosDataSource = new MatTableDataSource<Pedido>(this.listaPedidos);
     this.listaPedidosDataSource.sort = this.sort;
     this.paginator._intl.itemsPerPageLabel = 'Pedidos por pagina';
     this.listaPedidosDataSource.paginator = this.paginator;
   })
 }
  seleccionarDomiciliarioFunction(event:any){
  let referencia = event.path[4].childNodes[0].childNodes[0].data.replace(/ /g,'');
  this.pedidoService.asignarDomiciliario(referencia,this.seleccionarDomiciliario)

    setTimeout(() => {
      this.llenarTablaPedidos(this.estadoPedidosATraer);
      this.seleccionarDomiciliario = ""
    }, 500);
  }
  filtrarPedidos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.listaPedidosDataSource.filter = filtro.trim().toLowerCase();
  } 
  verDomiciliariosDisponibles(){
    this.usuarioService.getDomiciliarios().subscribe((domis:any)=>{
      let subListaDomiciliarios = [];
      for(let domiciliario of domis){
          subListaDomiciliarios.push(domiciliario);
      }
      this.listaDomiciliariosDisponibles = subListaDomiciliarios;
    })
  }
  cancelarPedido(event:any){
    let referencia =  event.path[4].childNodes[0].innerText.replace(/ /g,'')
    if(referencia == undefined || referencia.length > 8){
      referencia = event.path[3].childNodes[0].childNodes[0].data.replace(/ /g,'');
    }
    Swal.fire({
      title: '¿Estas seguro que quieres cancelar el pedido?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Regresar',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Cancelar pedido!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.cancelarPedido(referencia);
        Swal.fire({
          title: '¡Pedido cancelado!',
          icon: 'success',
        }).then((x)=>{
          this.llenarTablaPedidos(this.estadoPedidosATraer);
        })
      }
    })
  }
  generarPdf(id:string){
    const doc = new jsPDF()
    autoTable(doc,{ html: '#'+id })
    doc.save('ReportePedidos.pdf')
  }
  enviarPedido(event:any,destinoPedido:string){
       let referencia = event.path[4].childNodes[0].innerText.replace(/ /g,'');
    if(referencia == undefined || referencia.length > 8){
      referencia = event.path[3].childNodes[0].childNodes[0].data.replace(/ /g,'');
    }
    Swal.fire({
      title: '¿Estas seguro que quieres enviar el pedido?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'Regresar',
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Enviar pedido!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(destinoPedido == "domicilio"){
          this.pedidoService.cambiarEstadoPedido(referencia,"enviado");
        }
        else{
          this.pedidoService.cambiarEstadoPedido(referencia,"entregado");
        }
        Swal.fire({
          title: '¡Pedido enviado!',
          icon: 'success',
        }).then((x)=>{
          this.llenarTablaPedidos(this.estadoPedidosATraer);
        })
      }
    })
  }
  actualizar(event:any){
    setTimeout(() => {
      this.llenarTablaPedidos(this.estadoPedidosATraer );
    this.cd.detectChanges()
    }, 1000);
  }
  fileName= 'ReportePedidos.xlsx';
  exportexcel(): void{
    let element = document.getElementById('excel-table-pedidos');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  estadoPedidosATraer = ""; 
  ngOnInit(): void {
    this.estadoPedidosATraer = "pendiente"; 
  }
  ngAfterViewInit(): void {
    this.verDomiciliariosDisponibles();
     
    this.llenarTablaPedidos(this.estadoPedidosATraer);
   
    this.cd.detectChanges()
  }
  constructor(private pedidoService:PedidoService,
              private usuarioService:UsuarioService,
              private cd:ChangeDetectorRef) { }
}
export interface Pedido {
  "idpedido":number,
  "referenciapedido": string,
  "descripcionpedido": string,
  "telefonopedido": string,
  "destinopedido": string,
  "detalledestinopedido":string,
  "valorpedido": number,
  "observacionpedido": string,
  "fk_idusuario": number,
  "estadopedido": string,
  "fechapedido": string,
  "fk_iddomiciliario": number
}