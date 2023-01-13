-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2022 a las 08:00:40
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgecrdb1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriainsumos`
--

CREATE TABLE `categoriainsumos` (
  `idCategoriaInsumos` int(11) NOT NULL,
  `nombreCategoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoriainsumos`
--

INSERT INTO `categoriainsumos` (`idCategoriaInsumos`, `nombreCategoria`) VALUES
(1, 'categoria 1'),
(3, 'categoria 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriaproductos`
--

CREATE TABLE `categoriaproductos` (
  `idcategoriaproducto` int(11) NOT NULL,
  `nombrecategoriaproducto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoriaproductos`
--

INSERT INTO `categoriaproductos` (`idcategoriaproducto`, `nombrecategoriaproducto`) VALUES
(1, 'categoria 1'),
(2, 'categoria 2'),
(4, 'categoria 3'),
(6, 'categoria 4'),
(7, 'categoria 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallesporventa`
--

CREATE TABLE `detallesporventa` (
  `idDetalleVenta` int(11) NOT NULL,
  `cantidadDetalle` int(11) NOT NULL,
  `valorUnitarioDetalle` varchar(255) NOT NULL,
  `subTotalDetalle` varchar(255) NOT NULL,
  `iva` int(11) NOT NULL,
  `totalDetalle` varchar(255) NOT NULL,
  `productos_idProductos` int(11) NOT NULL,
  `ventas_idVentas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `idInsumo` int(11) NOT NULL,
  `nombreInsumo` varchar(255) NOT NULL,
  `cantidadInsumo` int(11) NOT NULL,
  `unidadInsumo` varchar(255) NOT NULL,
  `valorTotalInsumo` int(11) NOT NULL,
  `fechaIngreso` date DEFAULT NULL,
  `estadoInsumo` varchar(255) NOT NULL,
  `valorUnitarioInsumo` int(11) NOT NULL,
  `categoriaInsumos_idCategoriaInsumos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`idInsumo`, `nombreInsumo`, `cantidadInsumo`, `unidadInsumo`, `valorTotalInsumo`, `fechaIngreso`, `estadoInsumo`, `valorUnitarioInsumo`, `categoriaInsumos_idCategoriaInsumos`) VALUES
(1, 'insumo 1', 100, 'lb', 10200, '2022-11-28', 'Activo', 102, 1),
(2, 'leche', 12, 'lt', 60000, '2022-11-23', 'Activo', 5000, 1),
(3, 'queso tajado', 18, 'und', 2160, '2022-11-28', 'Activo', 120, 1),
(4, 'insumo 3', 121, 'und', 145200, '2022-11-28', 'Activo', 1200, 1),
(5, 'insumo 4', 10, 'und', 10000, '2022-11-28', 'Activo', 1000, 3),
(7, 'insumo nuevo 67', 199, 'und', 10000, '2022-11-29', 'Activo', 100, 1),
(8, 'insumo nuevo 68', 199, 'und', 20298, '2022-11-29', 'Activo', 102, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `referenciaPedido` varchar(255) NOT NULL,
  `descripcionPedido` varchar(255) NOT NULL,
  `destinoPedido` varchar(255) NOT NULL,
  `detalleDestinoPedido` varchar(255) NOT NULL,
  `valorPedido` varchar(255) NOT NULL,
  `observacionPedido` varchar(255) DEFAULT NULL,
  `estadoPedido` varchar(255) NOT NULL,
  `fechaPedido` date NOT NULL,
  `fk_idDomiciliario` int(11) DEFAULT NULL,
  `fk_idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `referenciaPedido`, `descripcionPedido`, `destinoPedido`, `detalleDestinoPedido`, `valorPedido`, `observacionPedido`, `estadoPedido`, `fechaPedido`, `fk_idDomiciliario`, `fk_idUsuario`) VALUES
(1, '123456', 'descripcion1', 'mesa', 'detalle destino 1', '10000', NULL, 'enviado', '2022-11-23', 2, 1),
(2, '106123', '[1 - Producto 1]', 'domicilio', '', '10000', '', 'Cancelado', '2020-03-22', 0, 1),
(3, '076783', '[1 - Producto 1]', 'mesa', '', '10000', '', 'Cancelado', '2022-11-23', 0, 1),
(4, '267ae9', '[6 - Producto 1]', 'domicilio', 'calle 200', '60000', 'sin sal', 'Enviado', '2022-11-23', 2, 1),
(5, 'b33309', '[6 - Producto 1]', 'recoge', '', '60000', 'ahorita llego', 'Cancelado', '2022-11-24', 0, 1),
(6, '50dddb', '[300 - Producto 1]', 'domicilio', 'calle 20', '3000000', 'con cuidado  porque son muchos productos, estare pendiente cuando lleguen', 'Enviado', '2022-11-24', 2, 1),
(7, 'ec86f2', '[1 - Producto 1]', '', '', '10000', '', 'Cancelado', '2022-11-24', 0, 1),
(8, '7b0e30', '[2 - Hamburguesa Doble],[1 - Hamburguesa Simple]', 'domicilio', 'calle 23', '147333', '', 'Cancelado', '2022-11-25', 2, 1),
(9, 'c955e8', '[1 - Producto 1]', 'domicilio', '', '100', '', 'pendiente', '2022-11-25', 0, 1),
(10, '2a8e56', '', '', '', '0', '', 'pendiente', '2022-11-25', 0, 1),
(11, 'cd9d2e', '[1 - Producto 1]', 'domicilio', '', '100', '', 'pendiente', '2022-11-25', 0, 1),
(12, 'dc3b3e', '[1 - Producto 1]', 'domicilio', '', '100', '', 'pendiente', '2022-11-25', 0, 1),
(13, '1dcd1d', '[4 - Hamburguesa Simple]', 'domicilio', '', '493332', '', 'pendiente', '2022-11-25', 0, 1),
(14, '816d2d', '[1 - Hamburguesa Simple]', 'domicilio', '', '123333', '', 'entregado', '2022-11-25', 3, 1),
(15, '493780', '[1 - Producto 1]', 'mesa', '', '100', '', 'pendiente', '2022-11-25', 0, 1),
(16, 'f14ea7', '[1 - Producto 1]', 'mesa', '', '100', '', 'Enviado', '2022-11-25', 0, 1),
(17, '5b05e7', '[9 - Hamburguesa Simple]', 'domicilio', '', '1109997', '', 'Cancelado', '2022-11-25', 2, 1),
(18, '96efec', '[7 - Producto 1],[8 - Hamburguesa Simple]', 'domicilio', 'casa uno', '987364', '', 'Enviado', '2022-11-25', 2, 1),
(19, '1d1424', '[2 - Producto 1],[2 - Hamburguesa Simple],[2 - Hamburguesa Doble]', 'domicilio', 'calle45 suba', '270866', 'una observacion aqiuo', 'Enviado', '2022-11-25', 2, 1),
(20, '8155f5', '[1 - Producto 1]', 'domicilio', 'calle 34', '100', '', 'entregado', '2022-11-28', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_has_productos`
--

CREATE TABLE `pedidos_has_productos` (
  `idPedidos_has_productoscol` int(11) NOT NULL,
  `pedidos_idPedidos` int(11) NOT NULL,
  `productos_idProductos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `idpermiso` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`idpermiso`, `descripcion`) VALUES
(1, 'permiso1'),
(2, 'permiso2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(255) NOT NULL,
  `descripcionProducto` varchar(255) NOT NULL,
  `ingredientesProducto` varchar(255) NOT NULL,
  `valorProducto` int(11) NOT NULL,
  `fk_categoriaproductos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `nombreProducto`, `descripcionProducto`, `ingredientesProducto`, `valorProducto`, `fk_categoriaproductos`) VALUES
(2, 'hamburguesa simple', 'nuevo producto descripcion', '[1 - insumo 1],[11 - leche]', 123333, 2),
(3, 'hamburguesa doble', 'nuevo producto descripcion', '[5 - insumo 1],[4 - leche]', 12000, 4),
(4, 'perro calienbte', '123213', '[5 - insumo 1],[3 - leche]', 1000, 2),
(5, 'sandwitch', '12324', '[1 - insumo 1],[1 - leche]', 100000, 4),
(6, 'quesadilla', 'una quesadiulla', '[1 - insumo 1],[1 - leche]', 10000, 2),
(8, 'sandwitch doble carne', 'un sand', '[1 - insumo 1],[1 - leche],[1 - queso tajado],[1 - insumo 4]', 1223, 1),
(9, 'brownie con helado', 'un brownie con helado rico', '[6 - insumo 1],[2 - leche],[3 - insumo 4]', 23456, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_has_insumos`
--

CREATE TABLE `productos_has_insumos` (
  `fk_idInsumos` int(11) NOT NULL,
  `fk_idProductos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(255) NOT NULL,
  `permisos_idpermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`, `permisos_idpermiso`) VALUES
(1, 'administrador', 1),
(2, 'domiciliario', 2),
(3, 'cliente', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(255) NOT NULL,
  `telefonoUsuario` varchar(255) NOT NULL,
  `emailUsuario` varchar(255) NOT NULL,
  `contrasenaUsuario` varchar(255) NOT NULL,
  `estadoUsuario` int(11) DEFAULT NULL,
  `codigoEmpresarial` varchar(255) DEFAULT NULL,
  `direccionUsuario` varchar(255) DEFAULT NULL,
  `roles_idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `telefonoUsuario`, `emailUsuario`, `contrasenaUsuario`, `estadoUsuario`, `codigoEmpresarial`, `direccionUsuario`, `roles_idRol`) VALUES
(1, 'administrador Rodolfo', '0000000002', 'administrador@gmail.com', '123123', 1, 'admin', '', 2),
(2, 'domiciliario1', '3002009999', 'administrador1@gmail.com', '123123', 0, 'domi', NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idVenta` int(11) NOT NULL,
  `fechaVenta` date NOT NULL,
  `totalVenta` varchar(255) NOT NULL,
  `Usuarios_idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`idVenta`, `fechaVenta`, `totalVenta`, `Usuarios_idUsuario`) VALUES
(1, '2022-11-23', '1000', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoriainsumos`
--
ALTER TABLE `categoriainsumos`
  ADD PRIMARY KEY (`idCategoriaInsumos`);

--
-- Indices de la tabla `categoriaproductos`
--
ALTER TABLE `categoriaproductos`
  ADD PRIMARY KEY (`idcategoriaproducto`);

--
-- Indices de la tabla `detallesporventa`
--
ALTER TABLE `detallesporventa`
  ADD PRIMARY KEY (`idDetalleVenta`),
  ADD KEY `productos_idProductos` (`productos_idProductos`),
  ADD KEY `ventas_idVentas` (`ventas_idVentas`);

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`idInsumo`),
  ADD KEY `categoriaInsumos_idCategoriaInsumos` (`categoriaInsumos_idCategoriaInsumos`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `fk_idUsuario` (`fk_idUsuario`);

--
-- Indices de la tabla `pedidos_has_productos`
--
ALTER TABLE `pedidos_has_productos`
  ADD PRIMARY KEY (`idPedidos_has_productoscol`),
  ADD KEY `fk_pedidos_has_productos_pedidos1` (`pedidos_idPedidos`),
  ADD KEY `fk_pedidos_has_productos_productos1` (`productos_idProductos`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`idpermiso`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `fk_categoriaproductos` (`fk_categoriaproductos`);

--
-- Indices de la tabla `productos_has_insumos`
--
ALTER TABLE `productos_has_insumos`
  ADD KEY `fk_idInsumos` (`fk_idInsumos`),
  ADD KEY `fk_idProductos` (`fk_idProductos`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`),
  ADD KEY `permisos_idpermiso` (`permisos_idpermiso`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `roles_idRol` (`roles_idRol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `Usuarios_idUsuario` (`Usuarios_idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoriainsumos`
--
ALTER TABLE `categoriainsumos`
  MODIFY `idCategoriaInsumos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categoriaproductos`
--
ALTER TABLE `categoriaproductos`
  MODIFY `idcategoriaproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detallesporventa`
--
ALTER TABLE `detallesporventa`
  MODIFY `idDetalleVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `idInsumo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `pedidos_has_productos`
--
ALTER TABLE `pedidos_has_productos`
  MODIFY `idPedidos_has_productoscol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `idpermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallesporventa`
--
ALTER TABLE `detallesporventa`
  ADD CONSTRAINT `productos_idProductos` FOREIGN KEY (`productos_idProductos`) REFERENCES `productos` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ventas_idVentas` FOREIGN KEY (`ventas_idVentas`) REFERENCES `ventas` (`idVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `categoriaInsumos_idCategoriaInsumos` FOREIGN KEY (`categoriaInsumos_idCategoriaInsumos`) REFERENCES `categoriainsumos` (`idCategoriaInsumos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (`fk_idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `pedidos_has_productos`
--
ALTER TABLE `pedidos_has_productos`
  ADD CONSTRAINT `fk_pedidos_has_productos_pedidos1` FOREIGN KEY (`pedidos_idPedidos`) REFERENCES `pedidos` (`idPedido`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedidos_has_productos_productos1` FOREIGN KEY (`productos_idProductos`) REFERENCES `productos` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoriaproductos` FOREIGN KEY (`fk_categoriaproductos`) REFERENCES `categoriaproductos` (`idcategoriaproducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos_has_insumos`
--
ALTER TABLE `productos_has_insumos`
  ADD CONSTRAINT `fk_idInsumos` FOREIGN KEY (`fk_idInsumos`) REFERENCES `insumos` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idProductos` FOREIGN KEY (`fk_idProductos`) REFERENCES `productos` (`idProducto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `permisos_idpermiso` FOREIGN KEY (`permisos_idpermiso`) REFERENCES `permisos` (`idpermiso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `roles_idRol` FOREIGN KEY (`roles_idRol`) REFERENCES `roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `Usuarios_idUsuario` FOREIGN KEY (`Usuarios_idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
