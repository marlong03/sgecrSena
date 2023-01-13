import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
import { CategoriaInsumoService } from 'src/app/services/categoriainsumo.service';
import { InsumoService } from 'src/app/services/insumo.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  constructor(private insumoService:InsumoService,
              private categoriaInsumoService:CategoriaInsumoService,
              private cd:ChangeDetectorRef) { }
  @Input() tituloSectionInput :string = "";
  listaInsumos:any[] = []
  dataSourceInventario:any = []
  idInsumoSeleccionado = "";
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  filtrarInsumos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceInventario.filter = filtro.trim().toLowerCase();
  } 
  seleccionarProductoEditar(event:any){
    let idInsumo = event.path[3].childNodes[0].id;
    if(parseInt(idInsumo) > 0){
      this.idInsumoSeleccionado = idInsumo;
    }
  }
  actualizar(event:any){
    setTimeout(() => {
      this.llenarTablaInsumos();
    this.cd.detectChanges()
    }, 1000);
  }
  generarPdf(id:string){
    const doc = new jsPDF()
    autoTable(doc,{ html: '#'+id })
    doc.save('ReporteInsumos.pdf')
  }
  fileName= 'ReporteInsumos.xlsx';
  exportexcel(): void{
    let element = document.getElementById('excel-table-insumos');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  llenarTablaInsumos(){
    this.insumoService.getInsumos().subscribe((insumos:any)=>{
      this.listaInsumos = insumos;
     this.dataSourceInventario = new MatTableDataSource<Insumo>(this.listaInsumos);
     this.dataSourceInventario.sort = this.sort;
     this.paginator._intl.itemsPerPageLabel = 'Insumos por pagina';
     this.dataSourceInventario.paginator = this.paginator;
    })
  }
  ngOnInit(): void {
    this.llenarTablaInsumos()
  }
  displayedColumnsInsumos:string[] = [
    'nombreinsumo',
    'cantidadinsumo',
    'valorunitarioinsumo',
    'valortotalinsumo',
    'unidadinsumo',
    'fk_idcategoriainsumos',
    'acciones'
  ]
}
interface Insumo{
  "idinsumo": number,
  "nombreinsumo": string,
  "cantidadinsumo": number,
  "unidadinsumo": string,
  "valortotalinsumo":number,
  "estadoinsumo":string,
  "fk_idcategoriainsumos": number,
  "valorunitarioinsumo":number,
  "fechaingresoinsumo":string
}

