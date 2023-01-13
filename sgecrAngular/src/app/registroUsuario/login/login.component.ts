import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  direccionarUrl(url:string){
    this.router.navigate([url])
  }
  email:any;
  password:any;
  sePuedeEnviar = false
  loginUsuario(){
    if(this.email == ""){
      Swal.fire(
        'Por favor ingresa un correo',
        'Por favor verifica y vuelve a intentarlo',
        'warning'
      )
    this.sePuedeEnviar = false
    }
    else if(this.password == ""){
      Swal.fire(
        'Por favor ingresa la contraseña',
        'Por favor verifica y vuelve a intentarlo',
        'warning'
      )
      this.sePuedeEnviar = false
    }else{
      this.sePuedeEnviar = true
    }
    if(this.sePuedeEnviar == true){
      this.usuarioService.validarUsuario(this.email,this.password).subscribe((data:any)=>{
        if(data != null){
          localStorage.clear()
          localStorage.setItem("usuario",JSON.stringify(data))
          if(data.codigoempresarial.toLowerCase() == "admin"){
            this.direccionarUrl('dashboardAdmin')
          }
          else if(data.codigoempresarial == "domi"){
            this.direccionarUrl('dashboardDomi')
          }
          else if(data.codigoempresarial == "coci"){
            this.direccionarUrl('dashboardCocina')
          }
          else if(data.codigoempresarial == ""){
            this.router.navigate([''])
          }
        }else{
          Swal.fire(
            '¡Ups! No te encontramos 😅',
            'Podrias registrarte',
            'error'
          ).then((x)=>{
            this.password = "";
          })
        }
      })
    }
  }
  constructor(private router:Router,
              private usuarioService:UsuarioService) { }
  ngOnInit(): void {
  }
}
