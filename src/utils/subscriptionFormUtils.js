// Helpers compartidos por los formularios de suscripción (alta en useAddSubscriptionForm,
// edición en useEditSubscriptionForm) para sanitizar/formatear los campos de precio y día.

export const MAX_CUSTOM_PRICE = 2000000;

// Igual criterio que sanitizeDayDigits: si el próximo dígito haría superar el máximo
// permitido para una suscripción personalizada, lo ignora y mantiene el valor anterior.
export function sanitizePriceDigits(rawValue, previousDigits) {
  const digitsOnly = rawValue.replace(/\D/g, '');
  if (!digitsOnly) return '';
  const numeric = parseInt(digitsOnly, 10);
  if (numeric > MAX_CUSTOM_PRICE) return previousDigits;
  return digitsOnly;
}

// Formatea dígitos con puntos como separador de miles (ej. "15000" -> "15.000")
// y descarta cualquier caracter que no sea número — así una coma u otro símbolo
// que se cuele no rompe el parseo al guardar.
export function formatPriceDigits(rawValue) {
  const digitsOnly = rawValue.replace(/\D/g, '');
  if (!digitsOnly) return '';
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Solo deja pasar dígitos (nada de comas/símbolos) y valores de día válidos (1 a 31).
// Si el próximo dígito haría un número fuera de rango (ej. "35"), lo ignora y
// mantiene el valor anterior en vez de aceptar un día inválido.
export function sanitizeDayDigits(rawValue, previousValue) {
  const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 2);
  if (digitsOnly === '') return '';
  const numeric = parseInt(digitsOnly, 10);
  if (numeric >= 1 && numeric <= 31) return digitsOnly;
  return previousValue;
}
