// Helpers de calendario: cantidad de días de un mes y el estado de un día
// respecto a "hoy". Reusable a futuro con cualquier year/month (no está
// atado al mes actual), para cuando agreguemos navegación entre meses.

// Cantidad real de días de un mes (contempla bisiestos automáticamente:
// el día 0 del mes siguiente es el último día del mes actual).
export function getDaysInMonth(year, month) {
  // month: 0-indexado (0 = enero), igual que Date nativo de JS
  return new Date(year, month + 1, 0).getDate();
}

// Estado de un día calendario respecto a la fecha real del sistema.
// Devuelve 'past' | 'today' | 'future'.
export function getDayStatus(year, month, day, referenceDate = new Date()) {
  const target = new Date(year, month, day);
  target.setHours(0, 0, 0, 0);

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  if (target.getTime() === today.getTime()) return 'today';
  return target < today ? 'past' : 'future';
}

// Info combinada de un día dentro de una grilla de tamaño fijo: si existe
// en el mes (ej. el 31 en un mes de 30 días no existe) y su estado.
export function getCalendarDayInfo(year, month, dayNumber, referenceDate = new Date()) {
  const daysInMonth = getDaysInMonth(year, month);
  const exists = dayNumber <= daysInMonth;

  if (!exists) {
    return { exists: false, status: 'none' };
  }

  return { exists: true, status: getDayStatus(year, month, dayNumber, referenceDate) };
}
