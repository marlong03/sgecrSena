import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardAdministradorComponent } from './dashboard-administrador/dashboard-administrador.component';
import { RegistroClienteComponent } from './registroUsuario/registro-cliente/registro-cliente.component';
import { RegistroEmpleadoComponent } from './registroUsuario/registro-empleado/registro-empleado.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './registroUsuario/login/login.component';
import { ScaleLinear, ScaleBand } from 'd3-scale';
import { BaseType } from 'd3-selection';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { RegistroPedidosPrincipalComponent } from './dashboard-administrador/registro-pedidos-principal/registro-pedidos-principal.component';
import { AnadirPedidoComponent } from './dashboard-administrador/anadir-pedido/anadir-pedido.component';
import { DashboardDomiciliarioComponent } from './dashboard-domiciliario/dashboard-domiciliario.component';
import { PedidosDomiciliarioComponent } from './dashboard-domiciliario/pedidos-domiciliario/pedidos-domiciliario.component';
import { EditarPerfilComponent } from './dashboard-domiciliario/editar-perfil/editar-perfil.component';
import { InventarioComponent } from './dashboard-administrador/inventario/inventario.component';
import { AnadirInsumoComponent } from './dashboard-administrador/inventario/anadir-insumo/anadir-insumo.component';
import { CategoriaInsumoComponent } from './dashboard-administrador/inventario/categoria-insumo/categoria-insumo.component';
import { RegistroUsuariosComponent } from './dashboard-administrador/registro-usuarios/registro-usuarios.component';
import { ProductoComponent } from './dashboard-administrador/inventario/producto/producto.component';
import { AnadirProductoComponent } from './dashboard-administrador/inventario/anadir-producto/anadir-producto.component';
import { CategoriaProductoComponent } from './dashboard-administrador/inventario/categoria-producto/categoria-producto.component';
import { GraficasComponent } from './dashboard-administrador/graficas/graficas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CarritoComponent } from './inicio/carrito/carrito.component';
import { DashboardCocinaComponent } from './dashboard-cocina/dashboard-cocina.component';
import { PedidosCocinaComponent } from './dashboard-cocina/pedidos-cocina/pedidos-cocina.component';
import { RegistroRolesComponent } from './dashboard-administrador/registro-roles/registro-roles.component';
const routes:Routes = [
  {
    path:"",
    component:InicioComponent
  },
  {
    path:"dashboardAdmin",
    component:DashboardAdministradorComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"registroCliente",
    component:RegistroClienteComponent
  },
  
  {
    path:"registroEmpleado",
    component:RegistroEmpleadoComponent
  },
  {
    path:"dashboardDomi",
    component:DashboardDomiciliarioComponent
  },
  {
    path:"dashboardCocina",
    component:DashboardCocinaComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    DashboardAdministradorComponent,
    RegistroClienteComponent,
    RegistroEmpleadoComponent,
    LoginComponent,
    RegistroPedidosPrincipalComponent,
    AnadirPedidoComponent,
    DashboardDomiciliarioComponent,
    PedidosDomiciliarioComponent,
    EditarPerfilComponent,
    InventarioComponent,
    AnadirInsumoComponent,
    CategoriaInsumoComponent,
    RegistroUsuariosComponent,
    ProductoComponent,
    AnadirProductoComponent,
    CategoriaProductoComponent,
    GraficasComponent,
    CarritoComponent,
    DashboardCocinaComponent,
    PedidosCocinaComponent,
    RegistroRolesComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    RouterModule.forRoot(routes,{useHash:true})
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
