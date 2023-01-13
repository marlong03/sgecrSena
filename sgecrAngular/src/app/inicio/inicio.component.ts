import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaProductoService } from '../services/categoriaproducto.service';
import { envioCorreoService } from '../services/envioCorreo.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private router:Router,
    private categoriasProductosService:CategoriaProductoService,
    private productoService:ProductoService,
    private pedidoService:PedidoService,
    private envioCorreoService:envioCorreoService) { }
  
  displayBlock = "none";
  listaPedidos:any[] = [];
  listaCategoriasProductos:any = []
  listaProductosSubMenu:any = [] 
  nombreCategoriaModal:string = ""
  usuarioSesion = JSON.parse(localStorage.getItem("usuario") || "[]") 
  nombreUsuarioSesion = this.usuarioSesion.nombreusuario
  displayClientes = false;
  pedidoDetalle:Pedido = {
    "idpedido": 0,
    "referenciapedido": "",
    "descripcionpedido": "",
    "telefonopedido": "",
    "destinopedido": "",
    "detalledestinopedido": "",
    "valorpedido": 0,
    "observacionpedido": "",
    "fk_idusuario": 0,
    "estadopedido": "",
    "fechapedido": new Date(),
    "fk_iddomiciliario": 0
  } ;
  displayCliente(){
    if(this.usuarioSesion.codigoempresarial == ""){
      this.displayClientes = true
    }
  }
  direccionarUrl(url:string){
      this.router.navigate([url])
  }
  traerCategoriasProductos(){
    this.categoriasProductosService.getCategoriaProductos().subscribe((categorias:any)=>{
      this.listaCategoriasProductos = categorias;
    })
  }
  traerProductosDeCategoriaProducto(categoria:any){
    this.nombreCategoriaModal = categoria.nombreCategoriaProducto.toUpperCase()
    this.listaProductosSubMenu = []
    this.productoService.getProductos().subscribe((productos:any)=>{
      for(let producto of productos){
        if(producto.fk_categoriaproductos == categoria.idCategoriaproducto){
          this.listaProductosSubMenu.push(producto)
        }
      }
    })
  }
  listaOrdenConProductosRepetidos:any = []
  listaOrden:any = []
  valorTotalOrdenes:any = 0;
  anadirProductoAOrden(event:any){
    let carritoImg:any = document.getElementById("carritoImg")
    let valorTotalOrden = 0;
    if(event.path[0].defaultValue.toLowerCase() == "añadir al carrito" ){
      carritoImg.classList.toggle('vibrar')
      setTimeout(() => {
        carritoImg.classList.toggle('vibrar')
        }, 400);
    //obteniendo datos para relleno objProductoParaOrden
    let nombreProducto = event.path[2].childNodes[0].childNodes[0].childNodes[0].data;
    let cantidadProducto = parseInt(event.path[2].childNodes[2].childNodes[1].value)
    let valorProducto = parseInt(event.path[2].childNodes[1].childNodes[2].childNodes[0].nodeValue.slice(1))
    if(cantidadProducto <= 0){
      cantidadProducto = 1
    }
    if(isNaN(cantidadProducto)){
      cantidadProducto = 1
    }
    let objProductoParaOrden = {
      nombre:nombreProducto,
      cantidad:cantidadProducto,
      valor:valorProducto,
      valorTotal:(cantidadProducto * valorProducto)
    }
    //-------------------------------------------------
    this.listaOrdenConProductosRepetidos.push(objProductoParaOrden);
    //No se repetiran los productos en el arreglo
    for(let i in this.listaOrden){
      if(objProductoParaOrden.nombre == this.listaOrden[i].nombre){
        this.listaOrden.splice(i,1);
      }
    }
    this.listaOrden.push(objProductoParaOrden);
    //-------------------------------------
  }
    //actualizamos valor total
    for(let i of this.listaOrden){
      valorTotalOrden += i.valorTotal;
    }
    this.valorTotalOrdenes = valorTotalOrden;
    //------------------------
  }
  actualizar(event:any){
      this.cerrarModal()
      this.cerrarModal1()
      this.displayCliente()
  }
  destino:string = "";
  detalleDestino:string = "";
  observacion:string = "";
  domiciliario:string = "";
  idDomiciliario:number = 0;
  emailDestinatario = ""
  displayBlock1 = "none"
  abrirModal(categoria:string){
    this.displayBlock = "block"
  }
  cerrarModal(){
    this.displayBlock = "none"
  }
  abrirModal1(){
    this.displayBlock1 = "block"
  }
  cerrarModal1(){
    this.displayBlock1 = "none"
  }
  cerrarSesion(){
    Swal.fire(
      'Cerraste sesion',
      '¡Nos vemos pronto!',
      'success'
      ).then((x)=>{
      this.displayClientes = false
      localStorage.removeItem('usuario')
      this.router.navigate(['/'])
    })
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
  displayon = 'none';
  displayPedidosDomiciliario = "block";
  displayEditarPerfil = "none";

  abrirComponenteEditarPerfil(){
    this.displayEditarPerfil = "block";
  }
  nombreSectionPintar = ""
  seleccionarSectionPintarEnModal(event:any){
    let nombreSection = event.path[0].childNodes[0].data.trim();
    this.nombreSectionPintar = nombreSection
  }
  displayModalDetalle = "none"
  abrirModalDetallePedido(){
    if(this.displayModalDetalle == "none"){
      this.displayModalDetalle  = "block";
    }
    else if(this.displayModalDetalle == "block"){
      this.displayModalDetalle  = "none";
    }
  }
  traerPedidos(op:string){
    this.listaPedidos = [];
    this.abrirModal1()
    this.pedidoService.getPedidos().subscribe((pedidos:any)=>{
      for(let p of pedidos){
        if(p.fk_idusuario == this.usuarioSesion.idusuario 
          && p.estadopedido.toLowerCase() == op){
          this.listaPedidos.push(p);
        }
      }
    })
  }
  escogerPedido(event:any){
    let referencia = event.path[2].childNodes[0].childNodes[0].childNodes[1].childNodes[0].data;
    if(typeof referencia == "string"){
      this.pedidoService.getPedidoPorReferencia(referencia).subscribe((pedido:any)=>{
        this.pedidoDetalle = pedido;
      })
    }
  }
  nombreEnvioCorreo = ""
  correoEnvioCorreo = ""
  mensajeEnvioCorreo = ""
  enviarCorreo(){
    this.envioCorreoService.PostCorreo("marlongyes@gmail.com",{
      nombre:this.nombreEnvioCorreo,
      correo:this.correoEnvioCorreo,
      mensaje:this.mensajeEnvioCorreo
    })
    Swal.fire(
      '¡Te contactaste con nosotros! 😁',
      'No tardaremos en responderte ',
      'success'
    )
  }
  ngOnInit(): void {
    this.traerCategoriasProductos()
    this.displayCliente()
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
  "telefonopedido":string,
  "destinopedido": string,
  "detalledestinopedido": string,
  "valorpedido": number,
  "observacionpedido": string,
  "fk_idusuario": number,
  "estadopedido": string,
  "fechapedido": Date,
  "fk_iddomiciliario": number
}
