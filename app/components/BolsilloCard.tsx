"use client";

import { Bolsillo, formatCOP } from "../lib/bolsillos";

type Props = {
  bolsillo: Bolsillo;
  monto: number;
  esPrioridad: boolean;
  sobrante: number;
  ingreso: number;
};

export default function BolsilloCard({ bolsillo, monto, esPrioridad, sobrante, ingreso }: Props) {
  const porcentajeReal = ingreso > 0 ? (monto / ingreso) * 100 : bolsillo.porcentaje;

  return (
    <div
      className="bolsillo-card"
      style={{ "--accent": bolsillo.color } as React.CSSProperties}
    >
      <div className="bolsillo-top">
        <span className="bolsillo-emoji">{bolsillo.emoji}</span>
        <h3 className="bolsillo-nombre">{bolsillo.nombre}</h3>
        {esPrioridad && <span className="badge-prioridad">Prioridad</span>}
      </div>

      <div className="bolsillo-bar-row">
        <div className="bolsillo-barra-wrap">
          <div
            className="bolsillo-barra"
            style={{ width: `${Math.min(porcentajeReal, 100)}%` }}
          />
        </div>
        <span className="bolsillo-monto">{formatCOP(monto)}</span>
      </div>

      <div className="bolsillo-footer">
        <span className="bolsillo-pct-base">{bolsillo.porcentaje}% base</span>
        {esPrioridad && sobrante > 0 && (
          <span className="bolsillo-extra">+{formatCOP(sobrante)} extra</span>
        )}
      </div>
    </div>
  );
}