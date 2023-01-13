package com.sgecr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sgecr.model.Pedido;
import com.sgecr.model.Usuario;
import com.sgecr.repository.PedidoRepository;
import com.sgecr.repository.UsuarioRepository;


@Service
public class PedidoService {
    @Autowired
    PedidoRepository repository;
    UsuarioRepository repositoryU;


    public List<Pedido>getPedidos(){
        return repository.findAll();
    }
    public Pedido getPedidoByReferencia(String referencia){
      return repository.findByReferenciapedido(referencia);
   }
    public Optional<Pedido> getPedido(int id){
        return repository.findById(id);
     }
     public void postPedido(Pedido u){
        repository.save(u);
     }
     public void postArrayPedidos(List<Pedido> pedidos){
         for(Pedido p : pedidos){
            repository.save(p);
         }
      }
     public void deletePedido(int id){
      repository.deleteById(id);
      }
      public void deletePedidoByReferencia(String referencia){
      /*    repository.deleteByReferencia(referencia); */
         }
     
  
  /*  public void AsignarPedidoDomiciliario(String referencia,String nombreUsuario){
      Pedido pedido = repository.findByReferenciapedido(referencia);
      Usuario usuario = repositoryU.findByNombreusuario(nombreUsuario);
      if(!usuario.equals(null)){
         pedido.setFk_iddomiciliario(usuario.getidusuario());
      }else{
         System.out.println("**************$$$$$$$$AQUI NULL");
      }
   } */
   
}
