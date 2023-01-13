import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaProductoService } from 'src/app/services/categoriaproducto.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.css']
})
export class AnadirProductoComponent implements OnInit {

  constructor(private insumoService:InsumoService,
              private categoriaProductoService:CategoriaProductoService,
              private productoService:ProductoService) { }
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  habilitarBtnCrearProducto = false;
  aparecerSeccionOrdenInsumo = false;
  listaInsumos:Insumo[] = [];
  listaOrden:any= [];
  listaOrdenConInsumosRepetidos:any= [];
  nombreProducto = "";
  listaCategoriaProductos:any = []
  listaInsumosDataSource:any = [];
  listaOrdenDataSource:any = [];
  valorTotalOrden:number = 0;
  @Input() idProductoSeleccionado = "";
  actualizarProducto = "false"; 
  @Output() private textoEmitido = new EventEmitter<string>();
  displayBlock = "none";
  displayedColumnsInsumos:string[] = [
    'nombreinsumo',
    'cantidadinsumo',
    'unidadinsumo',
    'acciones'
  ]
  displayedColumnsOrden:string[] = [
    'nombreinsumo',
    'cantidadinsumo',
    'acciones',
  ];
  cerrarModal(){
    this.displayBlock =   "none"
  }
  abrirModal(accion:string){
    this.llenarTablaCategoriasProductos()
    this.listaOrdenDataSource = []
    this.listaOrdenConInsumosRepetidos = []
    this.listaOrden = []
    this.listaInsumos = []
    this.listaInsumosDataSource = []
    this.listaOrdenConInsumosRepetidos = []
    this.llenarTablaInsumos()
    this.displayBlock =   "flex"
    if(parseInt(this.idProductoSeleccionado) > 0 && accion == 'actualizar'){
      this.actualizarProducto = "true"; 
      this.productoService.getProductosById(parseInt(this.idProductoSeleccionado)).subscribe((producto:any)=>{
      this.nombreProducto = producto.nombreproducto;
      this.valorProducto = producto.valorproducto;
      this.descripcion = producto.descripcionproducto;
      this.categoriaProducto = producto.fk_categoriaproductos;
      })
    }
    else if( accion == 'anadir'){
      this.nombreProducto = "";
      this.valorProducto = ""
      this.categoriaProducto = "";
      this.listaOrdenDataSource = []
      this.listaOrdenConInsumosRepetidos = []
      this.listaOrden = []
      this.descripcion = "";
      this.actualizarProducto = "false"; 
    }
  }
  displayBtnImportarExcel = "none"
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
            this.productoService.PostListProductos(excelDataFinal)
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
  llenarTablaCategoriasProductos(){
    this.listaCategoriaProductos = []
    this.categoriaProductoService.getCategoriaProductos().subscribe((catprods:any)=>{
      for(let cat of catprods){
        this.listaCategoriaProductos.push(cat)
      }
    })
  }
  llenarTablaInsumos(){
    this.insumoService.getInsumos().subscribe((insumos:any)=>{
     this.listaInsumos = insumos;
     this.listaInsumosDataSource = new MatTableDataSource<Insumo>(this.listaInsumos);
     this.listaInsumosDataSource.sort = this.sort;
     this.paginator._intl.itemsPerPageLabel = 'Insumos por pagina';
     this.listaInsumosDataSource.paginator = this.paginator;/*   aqui error */
   })
 }
 llenarTablaOrden(){
  this.listaOrdenDataSource = new MatTableDataSource<Orden>(this.listaOrden);
  this.listaOrdenDataSource.sort = this.sort;
  this.paginator._intl.itemsPerPageLabel = 'Productos por pagina';
  this.listaOrdenDataSource.paginator = this.paginator;
}
 filtrarInsumos(event: Event) {
  const filtro = (event.target as HTMLInputElement).value;
  this.listaInsumosDataSource.filter = filtro.trim().toLowerCase();
  }  
  anadirInsumoAOrden(event:any){
    let valorTotalOrden = 0;
    if(event.path[0].defaultValue == "Añadir"){
    let nombreProducto = event.path[2].childNodes[0].childNodes[0].data.trim();
    let cantidadProducto = parseInt(event.path[2].childNodes[1].childNodes[0].value);
    if(cantidadProducto < 1){
      cantidadProducto = 1
    }
    if(isNaN(cantidadProducto) == true){
      cantidadProducto = 1
    }
    let objProductoParaOrden = {
      nombre:nombreProducto,
      cantidad:cantidadProducto,
      valorTotal:this.valorProducto
    }
    //-------------------------------------------------
    this.listaOrdenConInsumosRepetidos.push(objProductoParaOrden);
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
      this.aparecerSeccionOrdenInsumo = true;
    }else{
      this.aparecerSeccionOrdenInsumo = false;
    }
    //-----------------------------
  }
  eliminarProductoDeOrden(event:any){
    let nombreProductoEliminar = event.path[2].childNodes[0].innerText.toLowerCase();
    for(let i in this.listaOrden){
      if(this.listaOrden[i].nombre.toLowerCase() == nombreProductoEliminar){
        this.valorTotalOrden -= this.listaOrden[i].valorTotal;
        this.listaOrden.splice(i,1);
        this.llenarTablaOrden();
        if(this.listaOrden.length == 0){
          this.aparecerSeccionOrdenInsumo = false;
        }
      }
    }
  }
  eliminarProducto(){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Quieres eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3fa838',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        try {
          if (result.isConfirmed) {
            this.productoService.deleteProductoById(parseInt(this.idProductoSeleccionado))
            Swal.fire(
            '¡Eliminaste un producto!',
            '',
            'success'
            ).then((x)=>{
              this.textoEmitido.emit('actualizar')
              this.cerrarModal()
            })
          }
        } catch (error) {
          Swal.fire(
            '¡Ups! No pudimos eliminar este producto',
            'error'
            ).then((x)=>{
              this.cerrarModal()
            })
        }
      })
  }
  descripcion = "";
  categoriaProducto = "";
  valorProducto = "";
  sePuedeEnviarProducto = false
validarProducto(ingredientes:string){
  if(ingredientes == ""){
    Swal.fire(
      'Por favor agrega insumos al producto',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }
  else if(this.nombreProducto == ""){
    Swal.fire(
      'Por favor agrega un nombre al producto',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }
  else if(this.valorProducto == ""){
    Swal.fire(
      'Por favor agrega un precio al producto',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }
  else if( parseInt(this.valorProducto) <= 0){
    Swal.fire(
      'Por favor agrega un precio mayor a 0',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }
  else if(this.descripcion == ""){
    Swal.fire(
      'Por favor agrega una descripcion del producto',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }
  else if(this.categoriaProducto == ""){
    Swal.fire(
      'Por favor escoge una categoria al producto',
      '',
      'warning'
    )
    this.sePuedeEnviarProducto = false
  }else{
    this.sePuedeEnviarProducto = true
  }
}
  crearProducto(){
    let nombresInsumos = []
    let ingredientesProducto = "";
    // obteniendo string de descripcion de pedido
    for(let insumoOrden of this.listaOrden){
      nombresInsumos.push('[' + insumoOrden.cantidad + ' - ' + insumoOrden.nombre + ']');
      ingredientesProducto = nombresInsumos.join();
    }
    this.validarProducto(ingredientesProducto)
    //-------------------------------------
    let productoEnviar:Producto = {
      "idproducto": 0,
      "nombreproducto": this.nombreProducto,
      "descripcionproducto": this.descripcion,
      "ingredientesproducto": ingredientesProducto,
      "valorproducto":parseInt(this.valorProducto),
      "fk_categoriaproductos":parseInt(this.categoriaProducto)
    }
    let productoActualizar:Producto = {
      "idproducto": parseInt(this.idProductoSeleccionado),
      "nombreproducto": this.nombreProducto,
      "descripcionproducto": this.descripcion,
      "ingredientesproducto": ingredientesProducto,
      "valorproducto":parseInt(this.valorProducto),
      "fk_categoriaproductos":parseInt(this.categoriaProducto)
    }
    try {
      if(this.sePuedeEnviarProducto == true){
        if(this.actualizarProducto == 'true'){
          this.productoService.PostProducto(productoActualizar)
        }else{
          this.productoService.PostProducto(productoEnviar)
        }
        this.textoEmitido.emit("actualizar");
        Swal.fire(
          '¡Haz creado un producto!',
          'El nuevo producto es: ' + this.nombreProducto,
          'success'
        ).then((x)=>{
          this.cerrarModal()
        
        })
      }
    } catch (error) {
      Swal.fire(
        '¡UPS! intenta nuevamente',
        '',
        'error'
      )
    }
   }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.llenarTablaInsumos()    
    this.llenarTablaCategoriasProductos()
  }
}
 export interface Insumo  {
  "idinsumo": number,
  "nombreinsumo": string,
  "cantidadinsumo": number,
  "unidadinsumo":string,
  "valortotalinsumo": number,
  "estadoinsumo": string,
  "valorunitarioinsumo": number,
  "categoriainsumos_idcategoriainsumos": number,
  "fechaingresoinsumo": Date
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
