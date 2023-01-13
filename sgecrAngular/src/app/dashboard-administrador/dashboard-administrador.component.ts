import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaInsumoService } from '../services/categoriainsumo.service';
import { InsumoService } from '../services/insumo.service';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-dashboard-administrador',
  templateUrl: './dashboard-administrador.component.html',
  styleUrls: ['./dashboard-administrador.component.css']
})
export class DashboardAdministradorComponent implements OnInit,OnDestroy {
  
  constructor(private router:Router,
    private usuarioService:UsuarioService,
    private pedidoService:PedidoService,
    private productoService:ProductoService,
    private insumoService:InsumoService,
    private categoriaInsumoService:CategoriaInsumoService) { }
    
  listaPedidos:any = [];
  listaInsumos:any = [];
  listaCategoriaInsumos:any = [];

  displayBlock = "none";
  displayBlockInsumo = 'none';
  displayTablaPedidos = "none";
  displayEditarUsuario = "none";
  displayTablaUsuarios = "none";
  displayProducto = "none";

  accionModalInsumo = "";
  categoriaSelect:any;

  pedidosTableState = false;
  insumoTableState = false;

  nombreUsuarioSesion = JSON.parse(localStorage.getItem("usuario") || "[]") 
  user =  JSON.parse(localStorage.getItem("usuario") || "[]")
  inicialesNombre = this.inicialesNombreFunction();
  inicialesNombreFunction(){
    let nombre = this.user.nombreusuario.split(" ")
    let iniciales = [];
     
      for(let i = 0; i< nombre.length;i++){
        iniciales.push(nombre[i].charAt(0))
        console.log(nombre[i].charAt(0));
      }
      return iniciales.join('').toUpperCase()/*  */
  }
  displayNavbar = "flex";
 /*  abrirNav(){
  } */
  cambiarDisplaySections(){
    if(this.displayEditarUsuario == "none"){
      this.displayEditarUsuario = "block"
      this.displayTablaPedidos = "none"
      this.displayTablaUsuarios = "none"
      this.displayInventario = "none";
      this.displayProducto = "none";
      this.displayGrafica = "none";

    }
  }
  cerrarSesion(){
    Swal.fire(
      '¡Cerraste sesion!',
      '¡Nos vemos pronto!',
      'success'
    ).then((x)=>{
      localStorage.removeItem('usuario')
      this.router.navigate(['/'])
    })
  }
  abrirModalInsumo(accion:string,event:any){
    this.accionModalInsumo = accion;
    if(accion == "Actualizar"){
      let idInsumo = event.path[2].cells[0].childNodes[0].data;
      this.insumoService.getInsumoById(idInsumo).subscribe((data:any)=>{
       this.nombreInsumo = data.nombreinsumo;
        this.cantidadInsumo = data.cantidadinsumo;
        this.valorUnitarioInsumo = data.valorunitarioinsumo;
        this.unidadInsumo = data.unidadinsumo;
        this.categoriaInsumoService.getCategoriaInsumoById(data.fk_idcategoriainsumos).subscribe((cat:any)=>{
          this.categoriaSelect = cat.nombrecategoria;
        })
        });
      this.actualizarInsumo(idInsumo);
    }
    this.displayBlockInsumo =   "block";
  }
  cerrarModalInsumo(){
    this.displayBlockInsumo =   "none"
  }
  EditarUsuario(){
this.cambiarDisplaySections()
  }
  abrirModal(){
    this.displayBlock =   "block"
    console.log(this.nombreUsuarioSesion);
  }
  cerrarModal(){
    this.displayBlock =   "none"
  }
  changeStatePedidosTableState(){
    this.insumoTableState = false;
    if(this.pedidosTableState == true){
      this.pedidosTableState = false;
    }else if(this.pedidosTableState == false){
      this.pedidosTableState = true;
    }
  }
  changeStateInsumoTableState(){
    this.pedidosTableState = false;
    if(this.insumoTableState == true){
      this.insumoTableState = false;
    }else if(this.insumoTableState == false){
      this.insumoTableState = true;
    }
  }
  direccionarUrl(url:string){
    this.router.navigate([url]);
  }
  nombreCompleto:any = this.user.nombreusuario;
  telefono:any = this.user.telefonousuario;
  email:any = this.user.emailusuario;
  contrasena:any = this.user.contrasenausuario;
  actualizarUsuario(){
    let data = {
      idusuario: this.user.idusuario,
      nombreusuario: this.nombreCompleto,
      telefonousuario: this.telefono,
      emailusuario: this.email,
      contrasenausuario: this.contrasena,
      estadousuario: 1,
      codigoempresarial:"Admin",
      direccionusuario: "",
      roles_idrol: 1
    }
    try{
      this.usuarioService.PostUsuario(data);
      localStorage.setItem("usuario",JSON.stringify(data))
    }catch(err){
      alert("NO PUDIMOS ACTUALIZAR EN USUARIO")
      console.log(err);
    }
  }
  nombreInsumo:any = "";
  cantidadInsumo:any = "";
  valorUnitarioInsumo:any = "";
  unidadInsumo:any= "";
  agregarInsumo(){
    let data =  {
      "idinsumo": 0,
      "nombreinsumo": this.nombreInsumo,
      "cantidadinsumo": this.cantidadInsumo,
      "unidadinsumo": this.unidadInsumo,
      "valortotalinsumo": (parseInt(this.cantidadInsumo) * parseInt(this.valorUnitarioInsumo)),
      "estadoinsumo": "Activo",
      "categoriainsumos_idcategoriainsumos": 2,
      "valorunitarioinsumo": this.valorUnitarioInsumo,
      "fechaingresoinsumo":new Date(Date.now())
    }
    try{
      console.log(data);
      this.insumoService.PostInsumo(data);
      alert("se añadio")
    }catch(err){
      alert("NO PUDIMOS CREAR EL INSUMO")
      console.log(err);
    }
  }
  actualizarInsumo(id:any){
    let data =  {
      "idinsumo": id,
      "nombreinsumo": this.nombreInsumo,
      "cantidadinsumo": this.cantidadInsumo,
      "unidadinsumo": this.unidadInsumo,
      "valortotalinsumo": (parseInt(this.cantidadInsumo) * parseInt(this.valorUnitarioInsumo)),
      "estadoinsumo": "Activo",
      "categoriainsumos_idcategoriainsumos": 2, //toca cambiar este valor
      "valorunitarioinsumo": this.valorUnitarioInsumo,
      "fechaingresoinsumo": new Date(Date.now())
    }
    try{
      console.log(data);
      this.insumoService.PostInsumo(data);
      alert("se actualizo ")
    }catch(err){
      alert("NO PUDIMOS CREAR EL INSUMO")
      console.log(err);
    }
  }
  ngOnInit(): void {
   
    this.inicialesNombreFunction()
    this.obtenerPedidos()
    this.obtenerInsumos()
    this.obtenerCategoriaInsumos()
    // control de la ruta por login
    if(localStorage.getItem('usuario') == null){
      this.router.navigate(['/'])
    }else{
      let user = JSON.parse(localStorage.getItem('usuario') || "[]")
      if(user.codigoempresarial.toLowerCase() == "admin"){

        this.router.navigate(['/dashboardAdmin'])
      }else{
        this.router.navigate(['/'])
      }
    }
  }
  obtenerPedidos(){
    this.pedidoService.getPedidos().subscribe((data:any)=>{
      /* console.log(data); */
      this.listaPedidos = data;
    })
  }
  obtenerInsumos(){
    this.insumoService.getInsumos().subscribe((data:any)=>{
      /* console.log(data); */
      this.listaInsumos = data;
    })
  }
  obtenerCategoriaInsumos(){
    this.categoriaInsumoService.getCategoriaInsumos().subscribe((data:any)=>{
     /*  console.log(data); */
      this.listaCategoriaInsumos = data;
    })
  }
  cerrarEditarUsuario(){
    this.displayEditarUsuario = "none";
  }
  tituloSectionInput = "estadisticas pedidos"
  displayInventario = "none";
  displayTablaRoles = "none"
  displayGrafica = ""
  obtenerTituloSection(event:any){
    this.tituloSectionInput = event.path[0].innerHTML
    if(this.tituloSectionInput.toLowerCase() == "listado de insumos"){
      this.displayInventario = "block";
      this.displayTablaPedidos = "none"
      this.displayTablaUsuarios = "none"
      this.displayEditarUsuario = "none"
      this.displayProducto = "none";
      this.displayTablaRoles = "none"
      this.displayGrafica = "none"


    }
    if(this.tituloSectionInput.toLowerCase().split(' ')[0] == "pedidos"){
      this.displayTablaPedidos = "block"
      this.displayInventario = "none";
      this.displayTablaUsuarios = "none"
      this.displayEditarUsuario = "none"
      this.displayProducto = "none";
      this.displayTablaRoles = "none"
      this.displayGrafica = "none"

    }
    if(this.tituloSectionInput.toLowerCase() == "listado de usuarios"){
      this.displayTablaUsuarios = "block"
      this.displayInventario = "none";
      this.displayTablaPedidos = "none"
      this.displayEditarUsuario = "none"
      this.displayProducto = "none";
      this.displayTablaRoles = "none"
      this.displayGrafica = "none"
    }
    if(this.tituloSectionInput.toLowerCase() == "listado de productos"){
      this.displayProducto = "block";
      this.displayTablaUsuarios = "none"
      this.displayInventario = "none";
      this.displayTablaPedidos = "none"
      this.displayEditarUsuario = "none"
      this.displayTablaRoles = "none"
      this.displayGrafica = "none"
    }
    if(this.tituloSectionInput.toLowerCase() == "listado de roles"){
      this.displayTablaRoles = "block"
      this.displayProducto = "none";
      this.displayTablaUsuarios = "none"
      this.displayInventario = "none";
      this.displayTablaPedidos = "none"
      this.displayEditarUsuario = "none"
      this.displayGrafica = "none"
    }
    if(this.tituloSectionInput.toLowerCase() == "estadisticas pedidos"){
      this.displayGrafica = "block"
      this.displayTablaRoles = "none"
      this.displayProducto = "none";
      this.displayTablaUsuarios = "none"
      this.displayInventario = "none";
      this.displayTablaPedidos = "none"
      this.displayEditarUsuario = "none"
    }
  }
  ngOnDestroy() {}
}
