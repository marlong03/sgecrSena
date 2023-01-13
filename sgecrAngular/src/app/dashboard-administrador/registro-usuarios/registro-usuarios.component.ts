import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  constructor(private usuarioService:UsuarioService) { }
  listaUsuarios = []
  @Input() tituloSectionInput = "";
  displayedColumnsUsuarios:string[]=[
    'nombreusuario',
    'telefonousuario',
    'emailusuario',
    /* 'contrasenausuario', */
    'codigoempresarial',
    'direccionusuario',
    'acciones',

  ];
  dataSourceUsuarios:any = []
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  llenarTablaUusarios(){
    this.usuarioService.getUsuarios().subscribe((usuarios:any)=>{
      this.listaUsuarios = usuarios;
      
      this.dataSourceUsuarios = new MatTableDataSource<Usuario>(this.listaUsuarios);
      this.dataSourceUsuarios.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = 'Usuarios por pagina';
      this.dataSourceUsuarios.paginator = this.paginator;
    })
  }
  filtrarUsuarios(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceUsuarios.filter = filtro.trim().toLowerCase();
  } 
  generarPdf(id:string){
    const doc = new jsPDF()
    autoTable(doc,{ html: '#'+id })
    doc.save('ReporteUsuarios.pdf')
  }
  fileName= 'ReporteUsuarios.xlsx';
  exportexcel(): void{
    let element = document.getElementById('excel-table-usuarios');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  eliminarUsuario(event:any){
    console.log(event);
    let idEliminar = event.path[2].childNodes[0].id
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro que quieres eliminar a este usuario?',
      text: "¡No podras recuperar estos datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si quiero eliminar este usuario',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuarioById(parseInt(idEliminar))
        this.llenarTablaUusarios()

        swalWithBootstrapButtons.fire(
          '¡Eliminaste un usuario!',
          '',
          'success'
        ).then(()=>{
          this.llenarTablaUusarios()
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Haz conservado este usuario!',
          '',
          'success'
        )
      }
    })
  }
  ngOnInit(): void {
    this.llenarTablaUusarios()
  }

}

interface Usuario{
  "idusuario": number,
  "nombreusuario": string,
  "telefonousuario": string,
  "emailusuario": string,
  "contrasenausuario": string,
  "estadousuario": number,
  "codigoempresarial": string,
  "direccionusuario": string ,
  "fk_idrol": number
  }