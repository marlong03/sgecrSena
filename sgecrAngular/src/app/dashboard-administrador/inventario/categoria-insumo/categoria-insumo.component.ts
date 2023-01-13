import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaInsumoService } from 'src/app/services/categoriainsumo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-insumo',
  templateUrl: './categoria-insumo.component.html',
  styleUrls: ['./categoria-insumo.component.css']
})
export class CategoriaInsumoComponent implements OnInit {
  constructor(private categoriaInsumoService:CategoriaInsumoService) { }
  nombreNuevaCategoria = "";
  displayBlock = "none";
  listaCategoriaInsumos = []
  displayedColumnsCategoriaInsumos:string[]=[
    'nombrecategoriainsumo',
    'Acciones'
  ];
  dataSourceCategoriaInsumos:any = []
  diplaySectionCrearCategoriaInsumos = "none";
  displayBtnCrearCategoriaInsumos = "flex";
  displayBlockInsumo = 'none';
  @Output() private textoEmitido = new EventEmitter<string>();
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  llenarTablaCategoriaInsumos(){
    this.categoriaInsumoService.getCategoriaInsumos().subscribe((categoria:any)=>{
      this.listaCategoriaInsumos = categoria;
      this.dataSourceCategoriaInsumos = new MatTableDataSource<CategoriaInsumo>(this.listaCategoriaInsumos);
      this.dataSourceCategoriaInsumos.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Categorias por pagina';
      this.dataSourceCategoriaInsumos.paginator = this.paginator;
    })
  }
  eliminarCategoriaInsumo(event:any){
    let idCategoriaInsumo = event.path[2].childNodes[0].id;
    let nombreCategoria = event.path[2].childNodes[0].childNodes[0].data;
    if(idCategoriaInsumo > 0){
      console.log(nombreCategoria);

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
          this.categoriaInsumoService.deleteCategoriaInsumoById(idCategoriaInsumo).subscribe((x:any)=>{
          })
          if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminaste una categoria!',
            'categoria eliminada: ' + nombreCategoria,  
            'success'
            ).then((x)=>{

              this.llenarTablaCategoriaInsumos()
            })
          }
        } catch (error) {
          Swal.fire(
            '¡Ups! No pudimos eliminar esta categoria',
            'error'
            ).then((x)=>{
              this.cerrarModal()
                this.llenarTablaCategoriaInsumos()
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
  filtrarCategoriaInsumos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceCategoriaInsumos.filter = filtro.trim().toLowerCase();
  } 
  habilitarCreacionCategoriaInsumo(){
    if(this.diplaySectionCrearCategoriaInsumos == "none"){
      this.diplaySectionCrearCategoriaInsumos = "flex"
    }
    else if(this.diplaySectionCrearCategoriaInsumos == "flex"){
      this.diplaySectionCrearCategoriaInsumos = "none"
    }

    if(this.displayBtnCrearCategoriaInsumos == "flex"){
      this.displayBtnCrearCategoriaInsumos = "none"
    }
    else if(this.displayBtnCrearCategoriaInsumos == "none"){
      this.displayBtnCrearCategoriaInsumos = "flex"
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
    let data = {
      idcategoriainsumos:0,
      nombrecategoria:this.nombreNuevaCategoria
    }
    if(this.sePuedeEnviar == true){
      this.categoriaInsumoService.PostCategoriaInsumo(data)
      Swal.fire(
        'Creaste una nueva categoria',
        'categoria creada: ' + this.nombreNuevaCategoria,  
        'success'
        ).then((x)=>{
          this.llenarTablaCategoriaInsumos();
          this.nombreNuevaCategoria = "";
          this.textoEmitido.emit('actualizar')
        })
    }
  }
  ngOnInit(): void {
    this.llenarTablaCategoriaInsumos()
  }
}
interface CategoriaInsumo {
  "idcategoriainsumos": number,
  "nombrecategoria": string
}
