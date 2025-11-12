export type Lang = 'en' | 'es'

export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    oneWay: 'One-Way Ticket',
    monthly: 'Monthly Pass',
    viewRoutes: 'View Routes',
    searchDest: 'Search for your destination',
    confirm: 'Confirm',
    orderSummary: 'Order summary:',
    ticketSummary: 'Ticket summary',
    arrivingAt: 'Arriving at',
    thankYou: 'Thank you',
    help: 'Help Center',
    selectLanguage: 'Select Language',
    discountCode: 'Discount Code',
    tapToPay: 'Please tap below to complete your payment',
    exit: 'Exit',
    selectedRoute: 'Selected route:',
    passesQuestion: 'How many passes do you need'
  },
  es: {
    oneWay: 'Boleto Sencillo',
    monthly: 'Pase Mensual',
    viewRoutes: 'Ver Rutas',
    searchDest: 'Buscar destino',
    confirm: 'Confirmar',
    orderSummary: 'Resumen del pedido:',
    ticketSummary: 'Resumen de boletos',
    arrivingAt: 'Llegando a',
    thankYou: 'Gracias',
    help: 'Centro de Ayuda',
    selectLanguage: 'Seleccionar idioma',
    discountCode: 'Código de descuento',
    tapToPay: 'Toque abajo para completar el pago',
    exit: 'Salir',
    selectedRoute: 'Ruta seleccionada:',
    passesQuestion: '¿Cuántos pases necesitas?'
  }
}

export const formatCurrency = (n: number) => `$${n.toFixed(2)}`