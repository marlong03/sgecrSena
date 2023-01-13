import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriaInsumoService } from 'src/app/services/categoriainsumo.service';
import { InsumoService } from 'src/app/services/insumo.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-anadir-insumo',
  templateUrl: './anadir-insumo.component.html',
  styleUrls: ['./anadir-insumo.component.css']
})
export class AnadirInsumoComponent implements OnInit {
  constructor( private categotiaInsumosService:CategoriaInsumoService,
              private insumoService:InsumoService,
              private cd:ChangeDetectorRef) { }
  displayBlock = "none";
  displayBtnImportarExcel = "none";
  displayBlockInsumo = 'none';
  listaNombresCategoriasInsumos:any[] = []
  actualizarInsumo = "false"; 
  @Input() idInsumoSeleccionado = "";
  @Output() private textoEmitido = new EventEmitter<string>();
  changeStateDisplayBtnImportarExcel(){
    if(this.displayBtnImportarExcel == "block"){
      this.displayBtnImportarExcel = "none";
    }
    else if(this.displayBtnImportarExcel == "none"){
      this.displayBtnImportarExcel = "block";
    }
    console.log(this.displayBtnImportarExcel);
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
      console.log(excelDataFinal); 
      Swal.fire({
        title: '¿Quieres importar nuevos insumos?',
        text: "Asegurate de que la tabla de excel tenga los campos de cabecera correctos. ¡para una correcta importacion! 😁",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3fa838',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear insumos'
      }).then((result) => {
        try {
          if (result.isConfirmed) {
            this.insumoService.PostListInsumos(excelDataFinal)
          this.textoEmitido.emit('actualizar')
          Swal.fire(
            '¡Importaste nuevos insumos!',
            '',  
            'success'
            ).then((x)=>{
              this.cerrarModal()
            })
          }
        } catch (error) {
          Swal.fire(
            '¡Ups! No pudimos crear los insumos',
            '',
            'error'
            ).then((x)=>{
              this.cerrarModal()
            })
        }
          
      })
    }
  }
  eliminarInsumo(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¿Quieres eliminar el insumo " + this.nombre + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3fa838',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      try {
        if (result.isConfirmed) {
          this.insumoService.deleteInsumoById(this.idInsumoSeleccionado).subscribe((x:any)=>{
           });
        Swal.fire(
          '¡Eliminaste un insumo!',
          'insumo eliminado: ' + this.nombre,  
          'success'
          ).then((x)=>{
            this.cerrarModal()
          })
        }
        this.textoEmitido.emit('actualizar')
      } catch (error) {
        Swal.fire(
          '¡Ups! No pudimos eliminar este insumo',
          'error'
          ).then((x)=>{
            this.cerrarModal()
          })
      }
    })
  }
  modificarInsumo(){
    this.sePuedeEnviar == false
    this.validarInsumo()
    let data:Insumo = {
      "idinsumo":parseInt(this.idInsumoSeleccionado),
      "nombreinsumo":this.nombre,
      "cantidadinsumo": parseInt(this.cantidad),
      "unidadinsumo": this.unidad,
      "valortotalinsumo": (parseInt(this.cantidad) * parseInt(this.precioUnitario)),
      "estadoinsumo": "Activo",
      "categoriainsumos_idcategoriainsumos": parseInt(this.idCategoria),
      "valorunitarioinsumo":parseInt(this.precioUnitario),
      "fechaingresoinsumo": new Date(Date.now())
    }
    try {
      if(this.sePuedeEnviar == true){
      this.insumoService.PostInsumo(data)
      this.textoEmitido.emit('actualizar')
      Swal.fire(
        '¡Actualizaste un insumo!',
        'insumo actualizado: ' + this.nombre,  
        'success'
        ).then((x)=>{
          this.cerrarModal()
        })
      }
    } catch (error) {
      console.log("error al enviar insumo");
      
    }
  }
  abrirModal(accion:string){
    this.llenarListaCategoriaInsumos()
    this.displayBlock =   "flex"
    if(parseInt(this.idInsumoSeleccionado) > 0 && accion == 'actualizar'){
      this.actualizarInsumo = "true"; 
      this.insumoService.getInsumoById(parseInt(this.idInsumoSeleccionado)).subscribe((insumo:any)=>{
        this.nombre = insumo.nombreinsumo;
        this.cantidad = insumo.cantidadinsumo;
        this.precioUnitario = insumo.valorunitarioinsumo;
        this.idCategoria = insumo.categoriainsumos_idcategoriainsumos;
        this.unidad = insumo.unidadinsumo;
      })
    }
    else if( accion == 'anadir'){
      this.actualizarInsumo = "false"; 
      this.nombre = "";
      this.nombre = "";
      this.unidad = "";
      this.precioUnitario = "";
      this.cantidad = "";
      this.idCategoria = ""
    }
  }
  cerrarModal(){
    this.displayBlock =   "none"
   this.displayBtnImportarExcel = "none"
  }
  llenarListaCategoriaInsumos(){
    this.categotiaInsumosService.getCategoriaInsumos().subscribe((categorias:any)=>{
      this.listaNombresCategoriasInsumos = categorias;
    })
  }
  nombre = "";
  unidad = "";
  precioUnitario = "";
  cantidad = "";
  idCategoria = ""
  sePuedeEnviar = false
  validarInsumo(){
    if(this.nombre == ""){
      Swal.fire(
        'Por favor ingrese el nombre del insumo',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }
    else if(this.unidad == ""){
      Swal.fire(
        'Por favor ingrese la unidad del insumo',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }
    else if(parseInt(this.precioUnitario) < 1){
      Swal.fire(
        'Por favor ingrese el precio unitario del insumo',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }
    else if(this.cantidad == ""){
      Swal.fire(
        'Por favor ingrese la cantidad del insumo',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }
    else if(parseInt(this.cantidad) < 1){
      Swal.fire(
        'Por favor ingrese una cantidad valida ',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }
    else if(this.idCategoria == ""){
      Swal.fire(
        'Por favor ingrese la categoria del insumo',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }else{
      this.sePuedeEnviar = true
    }
  }
  crearInsumo(){
    this.validarInsumo()
    let data = {
      "idinsumo": 0,
      "nombreinsumo":this.nombre,
      "cantidadinsumo": parseInt(this.cantidad),
      "unidadinsumo": this.unidad,
      "valortotalinsumo": (parseInt(this.cantidad) * parseInt(this.precioUnitario)),
      "estadoinsumo": "Activo",
      "categoriainsumos_idcategoriainsumos": parseInt(this.idCategoria),
      "valorunitarioinsumo":parseInt(this.precioUnitario),
      "fechaingresoinsumo": new Date(Date.now())
    }
    try {
      if(this.sePuedeEnviar == true){
        this.insumoService.PostInsumo(data)
        this.textoEmitido.emit("actualizar");
        Swal.fire(
          '¡Creaste un nuevo insumo!',
          'insumo creado: ' + this.nombre,  
          'success'
          ).then((x)=>{
            this.cerrarModal()
          })
      }
    } catch (error) {
      console.log("error al enviar insumo");
    }
  }
  ngOnInit(): void {
    this.llenarListaCategoriaInsumos()
  }
  ngAfterViewInit(): void {
  }
}
interface Insumo{
  "idinsumo": number,
  "nombreinsumo": string,
  "cantidadinsumo": number,
  "unidadinsumo": string,
  "valortotalinsumo":number,
  "estadoinsumo":string,
  "categoriainsumos_idcategoriainsumos": number,
  "valorunitarioinsumo":number,
  "fechaingresoinsumo":Date
}