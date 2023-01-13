import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {
  direccionarUrl(url:string){
    this.router.navigate([url])
  }

  nombreCompleto:any = "";
  telefono:any= "";
  email:any= "";
  password:any= "";
  passwordConfirm:any= "";
  codigoEmpresarial:any= "";
  fk_idRol:any = 0;
  crearUsuario(){
    let data = {
      idusuario: 0,
      nombreusuario: this.nombreCompleto,
      telefonousuario: this.telefono,
      emailusuario: this.email,
      contrasenausuario: this.passwordConfirm,
      estadousuario: 1,
      codigoempresarial: this.codigoEmpresarial,
      direccionusuario: "",
      roles_idrol: this.fk_idRol
    }
    console.log(data);
    try{
      this.usuarioService.PostUsuario(data);
      this.direccionarUrl("login")
    }catch(err){
      Swal.fire(
        '¡Ups! No logramos crear tu cuenta 😅',
        'Vuelve a intentarlo',
        'error'
      )
    }
  }
  sePuedeEnviar = false

  validarCamposUsuario(){
     //codigo empresarial
     if(this.codigoEmpresarial == "domi"){
      this.fk_idRol = 2;
    } else if(this.codigoEmpresarial == "admin"){
      this.fk_idRol = 1;
    }else if(this.codigoEmpresarial == "coci"){
      this.fk_idRol = 4;
    }
    else{
      Swal.fire(
        '¡Ups! Este codigo Empresarial no es valido 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
    }
    //validar campos
    if(this.nombreCompleto == ""){
      Swal.fire(
        '¡Ups! Este nombre no es valido 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.email == ""){
      Swal.fire(
        '¡Ups! Este email no es valido 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.fk_idRol == 0){
      Swal.fire(
        '¡Ups! Por favor ingresa un codigo empresarial valido 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.password == ""){
      Swal.fire(
        '¡Ups! Por favor ingresa una contraseña valido 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.password != this.passwordConfirm){
      Swal.fire(
        '¡Ups! Las contraseñas no coinciden 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.password != this.passwordConfirm){
      Swal.fire(
        '¡Ups! Las contraseñas no coinciden 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.password.split('').length < 5){
      Swal.fire(
        '¡Ups! La contraseña tiene que tener minimo 5 digitos 😅',
        'Revisa y vuelve a intentarlo',
        'error'
      )
      this.sePuedeEnviar = false
    }
    else if(this.codigoEmpresarial == "domi"){
      if(this.telefono == ""){
        Swal.fire(
          '¡Ups! Por favor ingresa un telefono 😅',
          'Este codigo empresarial requiere de un telefono',
          'error'
        )
        this.sePuedeEnviar = false
      }
    }else{
      this.sePuedeEnviar = true
    }
   
    if(this.sePuedeEnviar == true){
      Swal.fire(
        'Haz creado un usuario 😁',
        'Ahora podras iniciar sesion con el correo ' + this.email,
        'success'
      ).then((x:any)=>{
        this.crearUsuario()
      })
    }
  }
  constructor(private router:Router,
              private usuarioService:UsuarioService ) { }

  listaUsuarios:any = []
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios = data;
    })
  }
}
