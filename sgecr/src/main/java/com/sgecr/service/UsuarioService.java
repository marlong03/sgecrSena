package com.sgecr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Usuario;
import com.sgecr.repository.UsuarioRepository;
@Service
public class UsuarioService {
     @Autowired
     UsuarioRepository repository;

     public List<Usuario>getAllUsuarios(){
        return repository.findAll();
     }
      public List<Usuario>getAllDomiciliarios(){
         String codigoEmprearial = "domi";
         return repository.findByCodigoempresarial(codigoEmprearial);
      }
      public List<Usuario>getAllDomiciliariosDisponibles(){
         String codigoEmprearial = "domi";
         int estadoUsuario = 1;
         return repository.findByCodigoempresarialAndEstadousuario(codigoEmprearial, estadoUsuario);
      }
      public Optional<Usuario> getUsuarioByNombre(String nombre){
         return repository.findByNombreusuario(nombre);
      }
     public Optional<Usuario> getUsuario(int id){
        return repository.findById(id);
     }
     public void postUsuario(Usuario u){
        repository.save(u);
     }
     public Usuario validarUsuario(String email,String password){
        return repository.findByEmailusuarioAndContrasenausuario(email, password);
     }
     public void deleteUsuario(int id){
      repository.deleteById(id);
   }
}
