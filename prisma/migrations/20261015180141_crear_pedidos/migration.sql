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

-- CreateIndex
CREATE INDEX "pedidos_clienteId_idx" ON "pedidos"("clienteId");

-- CreateIndex
CREATE INDEX "pedidos_mensajeroId_idx" ON "pedidos"("mensajeroId");

-- CreateIndex
CREATE INDEX "pedidos_estado_fecha_idx" ON "pedidos"("estado", "fecha");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_mensajeroId_fkey" FOREIGN KEY ("mensajeroId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
