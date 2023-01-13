import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
import { RolService } from 'src/app/services/rol.service';
import { NonNullableFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-registro-roles',
  templateUrl: './registro-roles.component.html',
  styleUrls: ['./registro-roles.component.css']
})
export class RegistroRolesComponent implements OnInit {
  constructor(private rolService:RolService) { }
  listaRoles:any = []
  @Input() tituloSectionInput = "";
  displayedColumnsRoles:string[]=[
    "nombrerol",
    "codigoEmpresarial"
  ];
  dataSourceRoles:any = []
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  imprimir(){
    let algo = "hola soy marlong"
    let algo2 = algo.split('')
    let cadena = []
    for(let i = 0; i < 4; i++){
      cadena.push(algo2[i])
    }
    cadena.join('')
    
    
  }
  llenarTablaRoles(){
    
    this.rolService.getRoles().subscribe((roles:any)=>{
      /* this.listaRoles = roles; */
      let listaEnviar = []
      for(let rol of roles){
        let codigoEmpresarialArmado = rol.nombrerol

        let arrayCodigo = codigoEmpresarialArmado.split('')
        let codigoEmpresarialFinal = []

        
        for(let i = 0; i < 4; i++){
          codigoEmpresarialFinal.push(arrayCodigo[i])
          console.log(arrayCodigo[i]);
          
          
         
        }
        let objRol = {
          nombre:rol.nombrerol,
          codigoEmpresarial : codigoEmpresarialFinal.join('')
        }
        if(objRol.nombre.toLowerCase() == "cliente"){
          objRol.codigoEmpresarial = ""
        }
        console.log(objRol);
        listaEnviar.push(objRol) 
        this.listaRoles = listaEnviar;
        /* codigoEmpresarialFinal = arrayCodigo.join('') */
        
      }
      
      this.dataSourceRoles = new MatTableDataSource<Rol>(this.listaRoles);
      this.dataSourceRoles.sort = this.sort;
      /* this.paginator._intl.itemsPerPageLabel = 'Roles por pagina'; */
      this.dataSourceRoles.paginator = this.paginator;
      console.log(this.listaRoles);
      
    })
  }
  filtrarRoles(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceRoles.filter = filtro.trim().toLowerCase();
  } 
  generarPdf(id:string){
    const doc = new jsPDF()
    autoTable(doc,{ html: '#'+id })
    doc.save('ReporteRoles.pdf')
  }
  fileName= 'ReporteRoles.xlsx';
  exportexcel(): void{
    let element = document.getElementById('excel-table-roles');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnInit(): void {
    this.llenarTablaRoles()
  }
}
interface Rol  {
  "idrol": number,
  "nombrerol": string
}