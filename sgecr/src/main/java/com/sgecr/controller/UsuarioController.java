package com.sgecr.controller;

import java.util.List;
import java.util.Optional;

/* import org.apache.catalina.User; */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgecr.model.Usuario;
import com.sgecr.service.UsuarioService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/usuario/")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;
  
    @GetMapping("all")
    public List<Usuario> getUsuarios(){
        return usuarioService.getAllUsuarios();
    }
    @GetMapping("domiciliarios")
    public List<Usuario> getUsuariosDomiciliarios(){
        return usuarioService.getAllDomiciliarios();
    }
    @GetMapping("domiciliarios/disponibles")
    public List<Usuario> getUsuariosDomiciliariosDisponibles(){
        return usuarioService.getAllDomiciliariosDisponibles();
    }
    @GetMapping("nombre/{nombre}")
    public Optional<Usuario> getUsuarioByNombre(@PathVariable String nombre){
        return usuarioService.getUsuarioByNombre(nombre);
    }

    @GetMapping("{id}")
    public Optional<Usuario> getUsuarios(@PathVariable int id){
        return usuarioService.getUsuario(id);
    }
    @GetMapping("{email}/{password}")
    public Usuario getUsuarios(@PathVariable String email,@PathVariable String password){
        return usuarioService.validarUsuario(email, password);
    }
    @PostMapping("new")
    public void postUsuario(@RequestBody Usuario u){
        usuarioService.postUsuario(u);
        System.out.println(u);
       /*  return u; */
    }
    @DeleteMapping("eliminar/{id}")
    public int deleteUsuario(@PathVariable int id){
        usuarioService.deleteUsuario(id);
        return id;
    }
}
