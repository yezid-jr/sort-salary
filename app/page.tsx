"use client";

import { useMemo, useState } from "react";
import IngresoForm from "./components/IngresoForm";
import BolsilloCard from "./components/BolsilloCard";
import { BOLSILLOS, calcularDistribucion, PORCENTAJE_SOBRANTE } from "./lib/bolsillos";

export default function Home() {
  const [ingreso, setIngreso] = useState(0);
  const [prioridad, setPrioridad] = useState(BOLSILLOS[0].id);

  const distribucion = useMemo(
    () => calcularDistribucion(ingreso, prioridad),
    [ingreso, prioridad]
  );

  const sobrante = (ingreso * PORCENTAJE_SOBRANTE) / 100;

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div>
          <p className="eyebrow">Organiza tu dinero</p>
          <h1 className="hero-title">Distribuye tu ingreso</h1>
          <p className="hero-copy">
            Ingresa tu salario, elige tu bolsillo prioritario y ve cuánto recibe cada categoría.
          </p>
        </div>
        <div className="hero-card">
          <IngresoForm ingreso={ingreso} onIngresoChange={setIngreso} />

          <div className="select-group">
            <label htmlFor="prioridad">Bolsillo prioritario</label>
            <select
              id="prioridad"
              className="select-input"
              value={prioridad}
              onChange={(event) => setPrioridad(event.target.value)}
            >
              {BOLSILLOS.map((bolsillo) => (
                <option key={bolsillo.id} value={bolsillo.id}>
                  {bolsillo.nombre}
                </option>
              ))}
            </select>
            <p className="select-hint">
              El sobrante del {PORCENTAJE_SOBRANTE}% se agrega al bolsillo prioritario.
            </p>
          </div>
        </div>
      </section>

      <section className="cards-section">
        {BOLSILLOS.map((bolsillo) => (
          <BolsilloCard
            key={bolsillo.id}
            bolsillo={bolsillo}
            ingreso={ingreso}
            monto={Math.round(distribucion[bolsillo.id] ?? 0)}
            sobrante={bolsillo.id === prioridad ? sobrante : 0}
            esPrioridad={bolsillo.id === prioridad}
          />
        ))}
      </section>
    </main>
  );
}
