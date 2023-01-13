import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  constructor(private productoService:ProductoService,
              private cd:ChangeDetectorRef) { }
  @Input() tituloSectionInput :string = "";
  listaProductos:any[] = []
  idProductoSeleccionado = "";
  dataSourceProductos:any = []
  displayedColumnsProductos:string[] = [
    'nombreproducto',
    'descripcionproducto',
    'ingredientesproducto',
    'valorproducto',
    'acciones'
  ]
  @ViewChild(MatPaginator,{static: true})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  filtrarProductos(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filtro.trim().toLowerCase();
  } 
  seleccionarProductoEditar(event:any){
    let idProducto = event.path[3].childNodes[0].id;
    if(parseInt(idProducto) > 0){
      this.idProductoSeleccionado = idProducto;
    }
  }
  generarPdf(id:string){
    const doc = new jsPDF()
    autoTable(doc,{ html: '#'+id })
    doc.save('ReporteProductos.pdf')
  }
  fileName= 'ReporteProductos.xlsx';
  exportexcel(): void{
    let element = document.getElementById('excel-table-productos');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  llenarTablaProductos(){
    this.productoService.getProductos().subscribe((productos:any)=>{
      this.listaProductos = productos;
     this.dataSourceProductos = new MatTableDataSource<Producto>(this.listaProductos);
     this.dataSourceProductos.sort = this.sort;
     this.paginator._intl.itemsPerPageLabel = 'Productos por pagina';
     this.dataSourceProductos.paginator = this.paginator;
    })
  }
  actualizar(event:any){
    setTimeout(() => {
      this.llenarTablaProductos();
      this.cd.detectChanges()
    }, 1000);
  }
  ngOnInit(): void {
    this.llenarTablaProductos()
  }
}
interface Producto{
  "idproducto": number,
  "nombreproducto": string,
  "descripcionproducto": string,
  "ingredientesproducto": string,
  "valorproducto": number,
  "fk_categoriaproductos":number
}
