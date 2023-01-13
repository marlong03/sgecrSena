import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  aparecerSeccionOrdenPedido = false;
  habilitarBtnCrearPedido = false;
  listaPedidos : Pedido[] = [];
  listaProductos : Producto[] = [];
  @Input() listaOrden:any= [];
  listaOrdenConProductosRepetidos:any= [];
  destinoEscogido:any = ""
  listaDomiciliariosDisponibles:any = [];
  @Input() valorTotalOrdenes:number = 0;
  @Output() private textoEmitido = new EventEmitter<string>();
  listaOrdenDataSource:any = [];
  listaPedidosDataSource:any = [];
  listaProductosDataSource:any = [];
  displayBlock = "none"
  abrirModal(){
    this.displayBlock = "block"
  }
  cerrarModal(){
    this.displayBlock = "none"
  }
  displayedColumnsPedido:string[] = [
    'referenciapedido',
    'descripcionpedido',
    'observacionpedido',
    'destinopedido',
    'detalledestinopedido',
    'valorpedido',
    'fk_iddomiciliario',
    'accion'
  ];
  displayedColumnsOrden:string[] = [
    'nombreproducto',
    'cantidadproducto',
    'valorproducto',
    'Acciones',
  ];

  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  destino:string = "";
  detalleDestino:string = "";
  observacion:string = "";
  domiciliario:string = "";
  idDomiciliario:number = 0;
  generarLetra(){
    var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    var numero:any = (Math.random()*15).toFixed(0);
    return letras[numero];
  }
  generarHexadecimalRandom(){
    var coolor = "";
    for(var i=0;i<6;i++){
      coolor = coolor + this.generarLetra() ;
    }
    return coolor;
  }
  displayDetalleDestino = "block"
  detalleDestinoPlaceholder = "Detalle destino"
  usuarioSesion = JSON.parse(localStorage.getItem("usuario") || '[]');
  detalleDestinoValue = "";
  telefonoEnvioPedido = "";
  cambiarTextoDetalleDestino(){
    if(this.destinoEscogido == "mesa"){
      this.detalleDestinoPlaceholder = "Numero de mesa"
      this.displayDetalleDestino = "block";
      this.detalleDestinoValue = "";
      if(this.usuarioSesion.telefonousuario != ""){
        this.telefonoEnvioPedido = this.usuarioSesion.telefonousuario;
      }
    }
    else if(this.destinoEscogido == "domicilio"){
      this.detalleDestinoPlaceholder = "Direccion de envio"
      if(this.usuarioSesion.direccionusuario != ""){
        this.detalleDestinoValue = this.usuarioSesion.direccionusuario;
      }
      if(this.usuarioSesion.telefonousuario != ""){
        this.telefonoEnvioPedido = this.usuarioSesion.telefonousuario;
      }
      this.displayDetalleDestino = "block";
    }
    else if(this.destinoEscogido == "recoge"){
      this.displayDetalleDestino = "none";
      if(this.usuarioSesion.telefonousuario != ""){
        this.telefonoEnvioPedido = this.usuarioSesion.telefonousuario;
      }
    }
    else{
      this.detalleDestinoPlaceholder = "Detalle destino"
      this.displayDetalleDestino = "block";
      if(this.usuarioSesion.telefonousuario != ""){
        this.telefonoEnvioPedido = this.usuarioSesion.telefonousuario;
      }
    }
  }
  async crearPedido(){
    let idPedido = 0;
    let descripcionPedido:string = "";
    let nombresProductos = [];
    let referenciaPedido = this.generarHexadecimalRandom(); //toca modificar la referrencia del pedido
    let estadoPedido = "pendiente";
    let fechaPedido = "0";
    let idUsuarioSesion:number = 0;
    //------------------------------------
    //obteniendo id usuario en sesion
    if(this.usuarioSesion != '[]'){
      idUsuarioSesion = this.usuarioSesion.idusuario;
    } 
    //-------------------------------------
    // obteniendo string de descripcion de pedido
    for(let productoOrden of this.listaOrden){
      nombresProductos.push('[' + productoOrden.cantidad + ' - ' + productoOrden.nombre + ']');
      descripcionPedido = nombresProductos.join();
    }
    //validar datos
    let sePuedeEnviarPedido = false
    if(descripcionPedido == ""){
      Swal.fire(
        'Por favor agrega productos a tu pedido',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }
    else if(this.destinoEscogido == ""){
      Swal.fire(
        'Por favor agrega un destino',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }
    else if(this.detalleDestinoValue == "" && this.destinoEscogido != 'recoge'){
      Swal.fire(
        'Por favor agrega detalle de destino',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }else{
      sePuedeEnviarPedido = true
    }
    //-----------------------------------------------
    //envio de datos a base de datos
    let pedidoAEnviar:Pedido = {
      "idpedido": idPedido,
      "referenciapedido": referenciaPedido,
      "descripcionpedido":descripcionPedido,
      "telefonopedido": this.telefonoEnvioPedido,
      "destinopedido": this.destinoEscogido,
      "detalledestinopedido": this.detalleDestinoValue,
      "valorpedido": this.valorTotalOrdenes,
      "observacionpedido":this.observacion,
      "fk_idusuario": idUsuarioSesion,
      "estadopedido": "pendiente",
      "fechapedido":new Date(Date.now()),
      "fk_iddomiciliario": 0
    }
    try{
      if(sePuedeEnviarPedido == true){

        await this.pedidoService.PostPedido(pedidoAEnviar);
        Swal.fire(
          '¡Pedido Creado!',
          'Podras ver el estado de tu pedido en la seccion de pedidos pendientes',
          'success',
        ).then((x)=>{
          this.cerrarModal();
          this.detalleDestinoValue = "";
          this.destinoEscogido = "";
          this.telefonoEnvioPedido = "";
          this.observacion = "";
          this.valorTotalOrdenes = 0;
          descripcionPedido = ""
          referenciaPedido = ""
          idPedido = 0;
        })
        Swal.fire({
          title: '¿Estas seguro de tu pedido?',
          text: "Recuerda que no podras Cancelar ni modificar tu pedido a menos que te comuniques con la empresa",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#198754',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Estoy seguro!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              '¡Pedido creado!',
              'Podras consultar tu pedido con la referencia:' + referenciaPedido,
              'success'
            ).then((x)=>{
              this.cerrarModal();
              this.displayBlock = "none"
              this.textoEmitido.emit('actualizar')
            })
          }
        })
        }
   /*    this.textoEmitido.emit("actualizar"); */
     /*  setTimeout(() => {
     
        this.llenarTablaPedidos();
        this.vaciarCampos() 
      }, 1000); */


    }catch(err){
      console.log("ERROR AL ENVIAR PEDIDO");
      console.log(err);
    }
  }

  llenarTablaOrden(){
    this.listaOrdenDataSource = new MatTableDataSource<Orden>(this.listaOrden);
    this.listaOrdenDataSource.sort = this.sort;
    this.listaOrdenDataSource.paginator = this.paginator;
  }
  eliminarProductoDeOrden(event:any){
    let nombreProductoEliminar = event.path[2].childNodes[0].innerText;
    for(let i in this.listaOrden){
      if(this.listaOrden[i].nombre.toLowerCase() == nombreProductoEliminar.toLowerCase()){
        this.valorTotalOrdenes -= this.listaOrden[i].valorTotal;
        this.listaOrden.splice(i,1);
        this.llenarTablaOrden();
        if(this.listaOrden.length == 0){
          this.aparecerSeccionOrdenPedido = false;
        }
      }
    }
  }
  fileName= 'ExcelSheet.xlsx';
  constructor(private pedidoService:PedidoService) {}
  ngOnInit(): void {
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.listaPedidosDataSource.filter = filtro.trim().toLowerCase();
  }  
}
export interface Orden {
  'nombreinsumo':string,
  'cantidadinsumo':number,
  'valorinsumo':number,
}
interface Producto{
  "idproducto": number,
  "nombreproducto": string,
  "descripcionproducto": string,
  "ingredientesproducto": string,
  "valorproducto": number,
  "fk_categoriaproductos":number
}
export interface Pedido{
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
