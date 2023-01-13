package com.sgecr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sgecr.model.Pedido;
import com.sgecr.model.Usuario;

import com.sgecr.service.PedidoService;
import com.sgecr.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pedido/")

public class PedidoController {
    @Autowired
    PedidoService service;
    @Autowired
    UsuarioService serviceU;

    @GetMapping("all")
    public List<Pedido> getPedidos(){
        return service.getPedidos();
    }
    @GetMapping("{id}")
    public Optional<Pedido> getPedidos(@PathVariable int id){
        return service.getPedido(id);
    }
    @GetMapping("referencia/{ref}")
    public Pedido getPedidos(@PathVariable String ref){
        return service.getPedidoByReferencia(ref);
    }
    @PostMapping("new")
    public void postPedido(@RequestBody Pedido u){
        System.out.println(u);
        service.postPedido(u);
    }
    @PostMapping("lista/new")
    public void postListPedidos(@RequestBody List<Pedido> p){
        service.postArrayPedidos(p);
    }
  @GetMapping("asignardomiciliario/{ref}/{nombredomi}")
    public Pedido asignarDomiciliario(@PathVariable String ref,@PathVariable String nombredomi){
        //realizar metodo de actualizar de otro tipo y no getmapping a ver si asi si
        Pedido pedidoObtenido = service.getPedidoByReferencia(ref);
        Pedido pedidoActualizado = pedidoObtenido;
        
        Optional<Usuario> usuarioDomiciliario = serviceU.getUsuarioByNombre(nombredomi);
        Optional<Usuario> usuarioActualizado = usuarioDomiciliario;
        pedidoActualizado.setFk_iddomiciliario(usuarioDomiciliario.get().getidusuario());
        usuarioActualizado.get().setestadousuario(0);
        //no se como actualiza solito el estado del domiciliario sin hacer un service.post, pero sirve
        postPedido(pedidoActualizado);
        return pedidoActualizado; 
    } 
    @GetMapping("cancelarpedido/{ref}")
    public Pedido cancelarPedido(@PathVariable String ref){
        Pedido pedidoObtenido = service.getPedidoByReferencia(ref);
        Pedido pedidoActualizado = pedidoObtenido;
        pedidoActualizado.setEstadopedido("Cancelado");
        postPedido(pedidoActualizado);
        return pedidoActualizado; 
    } 
    @GetMapping("estado/{ref}/{estado}")
    public Pedido cambiarEstadoPedido(@PathVariable String ref,@PathVariable String estado){
        Pedido pedidoObtenido = service.getPedidoByReferencia(ref);
        String estadoPedido = estado.toLowerCase();
        Pedido pedidoActualizado = pedidoObtenido;
        pedidoActualizado.setEstadopedido(estadoPedido);
        postPedido(pedidoActualizado);
        return pedidoActualizado; 
    } 
    @GetMapping("enviarpedido/{ref}")
    public Pedido enviarPedido(@PathVariable String ref){
        Pedido pedidoObtenido = service.getPedidoByReferencia(ref);
        Pedido pedidoActualizado = pedidoObtenido;
        pedidoActualizado.setEstadopedido("enviado");
        postPedido(pedidoActualizado);
        return pedidoActualizado; 
    } 
    @DeleteMapping("{id}")
    public int deletePedido(@PathVariable int id){
        service.deletePedido(id);
        return id;
    }
}
