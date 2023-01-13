import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaProductoService } from 'src/app/services/categoriaproducto.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  constructor(private categoriaProductoService:CategoriaProductoService) { }
  nombreNuevaCategoria = "";
  displayBlock = "none";
  listaCategoriaProductos = []
  displayedColumnsCategoriaProductos:string[]=[
    'nombrecategoriaproducto',
    'acciones'
  ];
  dataSourceCategoriaProductos:any = []
  diplaySectionCrearCategoriaProductos = "none";
  displayBtnCrearCategoriaProductos = "flex";
  displayBlockProducto = 'none';
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  llenarTablaCategoriaProductos(){
    this.categoriaProductoService.getCategoriaProductos().subscribe((categoria:any)=>{
      this.listaCategoriaProductos = categoria;
      this.dataSourceCategoriaProductos = new MatTableDataSource<CategoriaProducto>(this.listaCategoriaProductos);
      this.dataSourceCategoriaProductos.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Categorias por pagina';
      this.dataSourceCategoriaProductos.paginator = this.paginator;
    })
  }
  eliminarCategoriaProducto(event:any){
    let idCategoriaProducto = event.path[2].childNodes[0].id;
    let nombreCategoria = event.path[2].childNodes[0].childNodes[0].data;
    if(idCategoriaProducto > 0){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Quieres eliminar la categoria " + nombreCategoria + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3fa838',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        try {
          if (result.isConfirmed) {
          this.categoriaProductoService.deleteCategoriaProductoById(idCategoriaProducto).subscribe((x:any)=>{})
          Swal.fire(
            '¡Eliminaste una categoria!',
            'categoria eliminada: ' + nombreCategoria,  
            'success'
            ).then((x)=>{
              this.llenarTablaCategoriaProductos()
            })
          }
          
        } catch (error) {
          Swal.fire(
            '¡Ups! No pudimos eliminar esta categoria',
            'error'
            ).then((x)=>{
              this.cerrarModal()
                this.llenarTablaCategoriaProductos()
            })
        }
      })
    }
  }
  abrirModal(){
    this.displayBlock =   "flex"
  }
  cerrarModal(){
    this.displayBlock =   "none"
  }
  filtrarCategoriaProductos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceCategoriaProductos.filter = filtro.trim().toLowerCase();
  } 
  habilitarCreacionCategoriaProducto(){
    if(this.diplaySectionCrearCategoriaProductos == "none"){
      this.diplaySectionCrearCategoriaProductos = "flex"
    }
    else if(this.diplaySectionCrearCategoriaProductos == "flex"){
      this.diplaySectionCrearCategoriaProductos = "none"
    }
    if(this.displayBtnCrearCategoriaProductos == "flex"){
      this.displayBtnCrearCategoriaProductos = "none"
    }
    else if(this.displayBtnCrearCategoriaProductos == "none"){
      this.displayBtnCrearCategoriaProductos = "flex"
    }
  }
  sePuedeEnviar = false
  crearCategoria(){
    if(this.nombreNuevaCategoria == ""){
      Swal.fire(
        'Por favor ingrese el nombre de la nueva categoria',
        '',
        'warning',
      )
      this.sePuedeEnviar = false
    }else{
      this.sePuedeEnviar = true
    }
    let data:CategoriaProducto = {
        "idCategoriaproducto": 0,
        "nombreCategoriaProducto": this.nombreNuevaCategoria
      }
      if(this.sePuedeEnviar == true){
      Swal.fire(
        'Creaste una nueva categoria',
        'categoria creada: ' + this.nombreNuevaCategoria,  
        'success'
        ).then((x)=>{
          if(x.isConfirmed){
            if(this.sePuedeEnviar == true){
              this.categoriaProductoService.PostCategoriaProducto(data)
            }
          }
          setTimeout(() => {
            this.llenarTablaCategoriaProductos();
            this.nombreNuevaCategoria = ""
          }, 1000);
        })
      }
  }
  ngOnInit(): void {
    this.llenarTablaCategoriaProductos()
  }
}
interface CategoriaProducto {
  "idCategoriaproducto": number,
  "nombreCategoriaProducto": string,
}

