-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMINISTRADOR', 'ADMINISTRATIVO', 'MENSAJERO', 'CLIENTE');

-- CreateEnum
CREATE TYPE "EstadoRegistro" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('SOLICITADO', 'PENDIENTE', 'ENTREGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TipoNotificacion" AS ENUM ('PEDIDO', 'PROMOCION', 'STOCK', 'SISTEMA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "nombreUsuario" VARCHAR(30),
    "correo" VARCHAR(120) NOT NULL,
    "contrasenaHash" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(20),
    "rol" "Rol" NOT NULL DEFAULT 'CLIENTE',
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "intentosFallidos" INTEGER NOT NULL DEFAULT 0,
    "bloqueadoHasta" TIMESTAMP(3),
    "ultimoAcceso" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(300),
    "precio" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "stockMinimo" INTEGER NOT NULL DEFAULT 15,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "imagen" VARCHAR(500),
    "estado" "EstadoRegistro" NOT NULL DEFAULT 'ACTIVO',
    "categoriaId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'SOLICITADO',
    "ubicacion" VARCHAR(200) NOT NULL,
    "notas" VARCHAR(300),
    "total" INTEGER NOT NULL,
    "motivoCancelacion" VARCHAR(200),
    "entregadoEn" TIMESTAMP(3),
    "clienteId" INTEGER NOT NULL,
    "mensajeroId" INTEGER,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_pedido" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "detalles_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "emitidaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" INTEGER NOT NULL,
    "enviadaEn" TIMESTAMP(3),
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoNotificacion" NOT NULL DEFAULT 'SISTEMA',
    "titulo" VARCHAR(100) NOT NULL,
    "mensaje" VARCHAR(300) NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "pedidoId" INTEGER,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nombreUsuario_key" ON "usuarios"("nombreUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- CreateIndex
CREATE INDEX "usuarios_rol_estado_idx" ON "usuarios"("rol", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nombre_key" ON "categorias"("nombre");

-- CreateIndex
CREATE INDEX "productos_categoriaId_idx" ON "productos"("categoriaId");

-- CreateIndex
CREATE INDEX "productos_estado_idx" ON "productos"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "productos_categoriaId_nombre_key" ON "productos"("categoriaId", "nombre");

-- CreateIndex
CREATE INDEX "pedidos_clienteId_idx" ON "pedidos"("clienteId");

-- CreateIndex
CREATE INDEX "pedidos_mensajeroId_idx" ON "pedidos"("mensajeroId");

-- CreateIndex
CREATE INDEX "pedidos_estado_fecha_idx" ON "pedidos"("estado", "fecha");

-- CreateIndex
CREATE INDEX "detalles_pedido_productoId_idx" ON "detalles_pedido"("productoId");

-- CreateIndex
CREATE UNIQUE INDEX "detalles_pedido_pedidoId_productoId_key" ON "detalles_pedido"("pedidoId", "productoId");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_numero_key" ON "facturas"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_pedidoId_key" ON "facturas"("pedidoId");

-- CreateIndex
CREATE INDEX "notificaciones_usuarioId_leida_idx" ON "notificaciones"("usuarioId", "leida");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_mensajeroId_fkey" FOREIGN KEY ("mensajeroId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalles_pedido" ADD CONSTRAINT "detalles_pedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
