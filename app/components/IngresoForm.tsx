"use client";

import { useState } from "react";
import { formatCOP } from "../lib/bolsillos";

type Props = {
  onIngresoChange: (valor: number) => void;
  ingreso: number;
};

export default function IngresoForm({ onIngresoChange, ingreso }: Props) {
  const [inputVal, setInputVal] = useState(ingreso > 0 ? String(ingreso) : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputVal(raw);
    onIngresoChange(Number(raw));
  };

  return (
    <div className="ingreso-form">
      <label className="ingreso-label">¿Cuánto recibiste?</label>
      <div className="ingreso-input-wrap">
        <span className="ingreso-prefix">$</span>
        <input
          type="text"
          inputMode="numeric"
          className="ingreso-input"
          placeholder="0"
          value={inputVal ? Number(inputVal).toLocaleString("es-CO") : ""}
          onChange={handleChange}
        />
        <span className="ingreso-suffix">COP</span>
      </div>
      {ingreso > 0 && (
        <p className="ingreso-hint">
          Distribuyendo <strong>{formatCOP(ingreso)}</strong>
        </p>
      )}
    </div>
  );
}