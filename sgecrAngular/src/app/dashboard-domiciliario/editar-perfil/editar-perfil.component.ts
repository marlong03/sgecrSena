import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  usuarioSesion = JSON.parse(localStorage.getItem('usuario') || "[]");
  email:string = this.usuarioSesion.emailusuario;
  nombre:string = this.usuarioSesion.nombreusuario;
  telefono:string = this.usuarioSesion.telefonousuario;
  contrasena:string = this.usuarioSesion.contrasenausuario;
  direccion = this.usuarioSesion.direccionusuario;
  @Output() private textoEmitido = new EventEmitter<string>();
  displayDireccion = false;
  sePuedeEnviar = false
  actualizarUsuario(){
    try{
      if(this.nombre == ""){
        Swal.fire(
          'Por favor ingrese un nombre',
          '',
          'warning'
          )
        this.sePuedeEnviar = false
      }
      else if(this.email == ""){
        Swal.fire(
          'Por favor ingrese un email valido',
          '',
          'warning'
          )
        this.sePuedeEnviar = false
      }
      else if(this.contrasena == ""){
        Swal.fire(
          'Por favor ingrese una contraseña mayor a 5 caracteres',
          '',
          'warning'
          )
        this.sePuedeEnviar = false
      }else{
        this.sePuedeEnviar = true

      }
      let data:Usuario = {
        "idusuario": this.usuarioSesion.idusuario,
        "nombreusuario": this.nombre,
        "telefonousuario": this.telefono,
        "emailusuario": this.email,
        "contrasenausuario": this.contrasena,
        "estadousuario": this.usuarioSesion.estadousuario,
        "codigoempresarial": this.usuarioSesion.codigoempresarial,
        "direccionusuario": this.direccion ,
        "roles_idrol": 2
        }
    if(this.sePuedeEnviar == true){
      Swal.fire({
        title: '¿Seguro quieres actualizar?',
        text: "Tendras que volver a iniciar sesión para ver los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Actualizar'
      }).then((x)=>{
        if(x.isConfirmed){
          Swal.fire(
            '¡Bravo! Haz actualizado tu perfil',
            'Por favor vuelve a iniciar sesion',
            'success'
            )
            this.usuarioService.PostUsuario(data)
            this.textoEmitido.emit('actualizar')
            localStorage.removeItem('usuario')
            this.router.navigate(['']);
          }
      })
    }
    }catch(err){
    }
  }
  constructor(private usuarioService:UsuarioService,
              private router:Router)   { }
  ngOnInit(): void {
    if(this.usuarioSesion.codigoempresarial == ""){
      this.displayDireccion = true;
    }
    if(this.usuarioSesion.codigoempresarial == "domi" || this.usuarioSesion.codigoempresarial == "admin"){
      this.displayDireccion = false;
    }
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
  "roles_idrol": number
  }
