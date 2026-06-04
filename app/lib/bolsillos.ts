export type Bolsillo = {
  id: string;
  nombre: string;
  porcentaje: number;
  color: string;
  emoji: string;
};

export const BOLSILLOS: Bolsillo[] = [
  { id: "ahorro", nombre: "Saving", porcentaje: 30, color: "#6BCB77", emoji: "💰" },
  { id: "cell", nombre: "CELL", porcentaje: 12, color: "#4ECDC4", emoji: "📱" },
  { id: "canelita", nombre: "Mi Canelita", porcentaje: 15, color: "#7FAbf9", emoji: "❤️" },
  { id: "mycare", nombre: "My Care", porcentaje: 8, color: "#dfebf3", emoji: "😶‍🌫️" },
  { id: "emergencias", nombre: "Emergencias", porcentaje: 10, color: "#FFE66D", emoji: "🚨" },
  { id: "moto", nombre: "Moto", porcentaje: 8, color: "#000", emoji: "🏍️" },
  { id: "holibirthdays", nombre: "Holi & Birthdays", porcentaje: 5, color: "#F9A8D4", emoji: "🎉" },
  { id: "icetex", nombre: "ICETEX", porcentaje: 7, color: "#FF6B6B", emoji: "🎓" },
  { id: "paragastar", nombre: "Para Gastar", porcentaje: 5, color: "#A78BFA", emoji: "🛍️" },
];

export const PORCENTAJE_FIJO = BOLSILLOS.reduce((acc, b) => acc + b.porcentaje, 0); // 65%
export const PORCENTAJE_SOBRANTE = 100 - PORCENTAJE_FIJO; // 35%

export function calcularDistribucion(
  ingreso: number,
  bolsilloPrioridad: string
): Record<string, number> {
  const resultado: Record<string, number> = {};

  for (const b of BOLSILLOS) {
    resultado[b.id] = (ingreso * b.porcentaje) / 100;
  }

  const sobrante = (ingreso * PORCENTAJE_SOBRANTE) / 100;
  if (bolsilloPrioridad && resultado[bolsilloPrioridad] !== undefined) {
    resultado[bolsilloPrioridad] += sobrante;
  }

  return resultado;
}

export function formatCOP(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}