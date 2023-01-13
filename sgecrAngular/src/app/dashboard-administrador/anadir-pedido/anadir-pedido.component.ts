import { Component, OnInit,ViewChild,Inject, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { ProductoService } from 'src/app/services/producto.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-anadir-pedido',
  templateUrl: './anadir-pedido.component.html',
  styleUrls: ['./anadir-pedido.component.css']
})
export class AnadirPedidoComponent implements OnInit {
  aparecerSeccionOrdenPedido = false;
  habilitarBtnCrearPedido = false;
  listaPedidos : Pedido[] = [];
  listaProductos : Producto[] = [];
  listaOrden:any= [];
  listaOrdenConProductosRepetidos:any= [];
  listaDomiciliariosDisponibles:any = [];
  valorTotalOrden:number = 0;
  listaOrdenDataSource:any = [];
  listaPedidosDataSource:any = [];
  listaProductosDataSource:any = [];
  @Output() private textoEmitido = new EventEmitter<string>();
  displayBlock = "none";
  displayBlockInsumo = 'none';
  displayBtnImportarExcel = "none"

  abrirModal(){
    this.vaciarCampos()
    this.displayBlock =   "flex"
  }
  cerrarModal(){
    this.displayBlock =   "none"
  }
  constructor(private pedidoService:PedidoService,
              private productoService:ProductoService,
              private usuarioService:UsuarioService,
              private cd:ChangeDetectorRef) { }
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
  displayedColumnsProducto:string[] = [
    'nombreproducto',
    'valorproducto',
    'Cantidad',
    'Acciones',
  ];
  displayedColumnsOrden:string[] = [
    'nombreproducto',
    'cantidadproducto',
    'valorproducto',
    'Acciones',
  ];
  //------------------------------------------
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  //---------------------------------------------
  //Relleno de tablas para angular material
  vaciarCampos(){
    this.destino = "";
    this.detalleDestino = ""
    this.observacion = ""
    this.listaOrden = []
    this.listaOrdenConProductosRepetidos = []
    this.listaOrdenDataSource = []
    this.telefonoPedido = ""
    this.valorTotalOrden = 0
    this.aparecerSeccionOrdenPedido = false
  }
  changeStateDisplayBtnImportarExcel(){
    if(this.displayBtnImportarExcel == "block"){
      this.displayBtnImportarExcel = "none";
    }
    else if(this.displayBtnImportarExcel == "none"){
      this.displayBtnImportarExcel = "block";
    }
  }
  excelData:any;
  importarExcel(event:any){
    let file = event.target.files[0]
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e)=>{
      var workBook = XLSX.read(fileReader.result,{type:'binary'})
      var sheetNames = workBook.SheetNames;
      var excelDataFinal:any[] = [];
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      for(let data of this.excelData){
        data.fechaingresoinsumo = new Date(Date.now())
        excelDataFinal.push(data)
      }
      Swal.fire({
        title: '¿Quieres importar nuevos pedidos?',
        text: "Asegurate de que la tabla de excel tenga los campos de cabecera correctos. ¡para una correcta importacion! 😁",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3fa838',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear pedidos'
      }).then((result) => {
        try {
          if (result.isConfirmed) {
            this.pedidoService.PostListPedidos(excelDataFinal)
          this.textoEmitido.emit('actualizar')
          Swal.fire(
            '¡Importaste nuevos pedidos!',
            '',  
            'success'
            ).then((x)=>{
              this.cerrarModal()
            })
          }
        } catch (error) {
          Swal.fire(
            '¡Ups! No pudimos crear los pedidos',
            '',
            'error'
            ).then((x)=>{
              this.cerrarModal()
            })
        }
      })
    }
  }
  llenarTablaPedidos(){
     this.pedidoService.getPedidos().subscribe((pedidos:any)=>{
      this.listaPedidos = pedidos;
      this.listaPedidosDataSource = new MatTableDataSource<Pedido>(this.listaPedidos);
      //features table
      this.listaPedidosDataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Pedidos por pagina';
      this.listaPedidosDataSource.paginator = this.paginator;/*   aqui error */
    })
  }
  llenarTablaProductos(){
    this.productoService.getProductos().subscribe((productos:any)=>{
      this.listaProductos = productos;
      this.listaProductosDataSource = new MatTableDataSource<Producto>(this.listaProductos);
    //features table
    this.listaProductosDataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Productos por pagina';
    this.listaProductosDataSource.paginator = this.paginator;
    })
  }
  llenarTablaOrden(){
      this.listaOrdenDataSource = new MatTableDataSource<Orden>(this.listaOrden);
      //features table
      this.listaOrdenDataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Productos por pagina';
      this.listaOrdenDataSource.paginator = this.paginator;
  }
  //----------------------------------------------------------
  anadirProductoAOrden(event:any){
    let valorTotalOrden = 0;
    if(event.path[0].defaultValue == "Añadir"){
    //obteniendo datos para relleno objProductoParaOrden
    let nombreProducto = event.path[2].childNodes[0].innerText;
    let cantidadProducto = parseInt(event.path[2].childNodes[2].childNodes[0].value);
    let valorProducto = event.path[2].childNodes[1].childNodes[0].data.split("")
    valorProducto.shift()
    if(cantidadProducto <= 0){
      cantidadProducto = 1
    }
    if(isNaN(cantidadProducto) == true){
      cantidadProducto = 1
    }
    valorProducto = parseInt(valorProducto.join(''))
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
    this.llenarTablaOrden();
    //-------------------------------------
  }
    //actualizamos valor total
    for(let i of this.listaOrden){
      valorTotalOrden += i.valorTotal;
    }
    this.valorTotalOrden = valorTotalOrden;
    //------------------------
    //aparecer Seccion Orden Pedido
    if(this.listaOrden.length != 0){
      this.aparecerSeccionOrdenPedido = true;
    }else{
      this.aparecerSeccionOrdenPedido = false;
    }
    //-----------------------------
  }
  eliminarProductoDeOrden(event:any){
    let nombreProductoEliminar = event.path[2].childNodes[0].innerText;
    for(let i in this.listaOrden){
      if(this.listaOrden[i].nombre.toLowerCase() == nombreProductoEliminar.toLowerCase()){
        this.valorTotalOrden -= this.listaOrden[i].valorTotal;
        this.listaOrden.splice(i,1);
        this.llenarTablaOrden();
        if(this.listaOrden.length == 0){
          this.aparecerSeccionOrdenPedido = false;
        }
      }
    }
  }
  destino:string = "";
  detalleDestino:string = "";
  observacion:string = "";
  domiciliario:string = "";
  idDomiciliario:number = 0;
  telefonoPedido:string = "";
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
  async crearPedido(){
    let idPedido = 0;
    let descripcionPedido:string = "";
    let nombresProductos = [];
    let referenciaPedido = this.generarHexadecimalRandom  (); //toca modificar la referrencia del pedido
    let estadoPedido = "pendiente";
    let fechaPedido = "0";
    let idUsuarioSesion:number = 0;
    //------------------------------------
    //obteniendo id usuario en sesion
    let usuarioSesion = JSON.parse(localStorage.getItem("usuario") || '[]');
    if(usuarioSesion != ''){
      idUsuarioSesion = usuarioSesion.idusuario;
    } 
    //-------------------------------------
    // obteniendo string de descripcion de pedido
    for(let productoOrden of this.listaOrden){
      nombresProductos.push('[' + productoOrden.cantidad + ' - ' + productoOrden.nombre + ']');
      descripcionPedido = nombresProductos.join();
    }
    //envio de datos a base de datos
    let sePuedeEnviarPedido = false
    if(descripcionPedido == ""){
      Swal.fire(
        'Por favor agrega productos a tu pedido',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }
    else if(this.destino == ""){
      Swal.fire(
        'Por favor agrega un destino',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }
    else if(this.detalleDestino == ""){
      Swal.fire(
        'Por favor agrega detalle de destino',
        '',
        'warning'
      )
      sePuedeEnviarPedido = false
    }else{
      sePuedeEnviarPedido = true
    }
    let pedidoAEnviar:Pedido = {
      "idpedido": idPedido,
      "referenciapedido": referenciaPedido,
      "descripcionpedido":descripcionPedido,
      "telefonopedido":this.telefonoPedido,
      "destinopedido": this.destino,
      "detalledestinopedido": this.detalleDestino,
      "valorpedido": this.valorTotalOrden,
      "observacionpedido":this.observacion,
      "fk_idusuario": idUsuarioSesion,
      "estadopedido": estadoPedido,
      "fechapedido":new Date(Date.now()),
      "fk_iddomiciliario": this.idDomiciliario
    }
    try{
      if(sePuedeEnviarPedido == true){
        await this.pedidoService.PostPedido(pedidoAEnviar);
        Swal.fire(
          'Haz creado un pedido',
          '',
          'success'
        ).then(()=>{
          this.textoEmitido.emit("actualizar");
          setTimeout(() => {
            this.llenarTablaPedidos();
            this.cerrarModal();
            this.vaciarCampos();
          }, 1000);
        })
      }
    }catch(err){
      console.log("ERROR AL ENVIAR PEDIDO");
      console.log(err);
    }
  }
    //-----------------------------------------------
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.llenarTablaPedidos();
    this.llenarTablaProductos();
    this.cd.detectChanges();
  }
  filtrarPedidos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.listaPedidosDataSource.filter = filtro.trim().toLowerCase();
  }  
  filtrarProductos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.listaProductosDataSource.filter = filtro.trim().toLowerCase();
  }  
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
export interface Producto  {
  "idproducto": number,
  "nombreproducto": string,
  "descripcionproducto":string,
  "ingredientesproducto": string,
  "valorproducto": number
} //PUEDE GENERAR PROBLEMA POR CAMBIAR LA INTERFACE #######
export interface Orden {
  "nombre": string,
  "cantidad": number
  "valor": number
  "valorTotal": number
}