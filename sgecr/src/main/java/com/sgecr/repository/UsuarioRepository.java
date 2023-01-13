package com.sgecr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
/* import org.springframework.data.repository.CrudRepository; */
import org.springframework.stereotype.Repository;

import com.sgecr.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {
    Usuario findByEmailusuarioAndContrasenausuario(String emailusuario,String contrasenausuario);
    List<Usuario> findByCodigoempresarial(String codigoempresarial);
    List<Usuario> findByCodigoempresarialAndEstadousuario(String codigoempresarial,int estadousuario);
   
    /* HACE METODO PARA ACTUALIZAR */
    /* encontrar el pedido con esa referencia  */
    /*  a ese pedido actualizarle el iddomiciliario */
    /* borrar lo que hice ahorita en la noche */
    Optional<Usuario> findByNombreusuario(String nombreusuario);
}
