export type Lang = 'en' | 'es'

export type Copy = {
  topbar: { label: string }
  intro: {
    tapToContinue: string
    invited: string
    celebrateWeddingOf: string
    message: string
    scroll: string
    names: { a: string; b: string }
  }
  reveal: {
    title: string
    subtitle: string
    completeMessage: string
    parts: { day: string; month: string; year: string }
  }
  countdown: {
    title: string
    until: string
    units: { days: string; hours: string; minutes: string; seconds: string }
  }
  venue: {
    title: string
    extra: string
    at: string
    name: string
    address1: string
    address2: string
    dateLine: string
    follow: string
  }
  menu: { date: string; title: string; courses: { label: string; value: string }[] }
  dressCode: { title: string; body: string; attire: string; avoid: string }
  gifts: {
    title: string
    body: string
    love: string
    bankDetails: string
    accountHolder: string
    iban: string
    reference: string
  }
  transport: {
    title: string
    body: string
    busDeparture: string
    busDeparturePlace: string
    busDepartureTime: string
    returnTo: string
    returnTime: string
    note: string
  }
  rsvp: {
    title: string
    subtitle: string
    fullName: string
    email: string
    willAttend: string
    yes: string
    no: string
    guestCount: string
    guestNames: string
    dietary: string
    message: string
    song: string
    needsBus: string
    submit: string
    required: string
    thanksTitle: string
    thanksBody: string
    thanksFrom: string
  }
}

export const COPY: Record<Lang, Copy> = {
  en: {
    topbar: { label: 'Nuestra Boda' },
    intro: {
      tapToContinue: 'Tap to continue',
      invited: 'YOU ARE CORDIALLY INVITED TO',
      celebrateWeddingOf: 'CELEBRATE THE WEDDING OF',
      message:
        'We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.',
      scroll: 'SCROLL',
      names: { a: 'Milan', b: 'Jennifer' },
    },
    reveal: {
      title: 'Reveal',
      subtitle: 'SCRATCH TO DISCOVER THE DATE',
      completeMessage: "We're getting married",
      parts: { day: '06', month: 'June', year: '2026' },
    },
    countdown: {
      title: 'Countdown',
      until: 'until the big day',
      units: { days: 'DAYS', hours: 'HOURS', minutes: 'MIN', seconds: 'SEC' },
    },
    venue: {
      title: 'THE CELEBRATION WILL TAKE PLACE',
      extra: 'Extra: custom illustration of your venue',
      at: 'AT',
      name: 'Villa Medicea di Artimino',
      address1: 'VIA DI PAPALEONE X, 28',
      address2: 'ARTIMINO, FLORENCIA',
      dateLine: 'June 06, 2026',
      follow: 'Reception to Follow',
    },
    menu: {
      date: '06 June 2026',
      title: 'Menu',
      courses: [
        { label: 'APERITIVO', value: 'Selección de antipasti toscanos\nBruschetta, crostini & affettati misti' },
        { label: 'PRIMO', value: 'Risotto al tartufo nero di Norcia\ncon parmigiano reggiano 24 mesi' },
        { label: 'SECONDO', value: 'Filetto di manzo alla griglia\ncon salsa al vino rosso e verdure di stagione' },
        { label: 'DOLCE', value: 'Torta nuziale con crema di mascarpone\ne frutti di bosco freschi\n\nVini della Tenuta' },
      ],
    },
    dressCode: {
      title: 'Dress Code',
      body: 'We invite you to dress elegantly and formally to celebrate this special day with us.',
      attire: 'Formal Attire',
      avoid: 'Please avoid wearing white',
    },
    gifts: {
      title: 'Gifts',
      body:
        'Your presence is the best gift we could receive. However, if you wish to contribute to our new life together, you can do so via bank transfer.',
      love: 'With all our love',
      bankDetails: 'BANK DETAILS',
      accountHolder: 'ACCOUNT HOLDER: MILAN & JENNIFER',
      iban: 'IBAN: ES00 0000 0000 0000 0000 0000',
      reference: 'REFERENCE: Milan & Jennifer Wedding',
    },
    transport: {
      title: 'Transport',
      body:
        'We have organized buses from the center of Florence to the villa so you can enjoy the celebration without worries.',
      busDeparture: 'BUS DEPARTURE',
      busDeparturePlace: 'Piazza della Signoria',
      busDepartureTime: '16:00h',
      returnTo: 'RETURN TO FLORENCE',
      returnTime: '02:00h',
      note: 'Please indicate in your RSVP if you need transport',
    },
    rsvp: {
      title: 'Confirm your attendance',
      subtitle: 'This form is fully customizable to your needs',
      fullName: 'FULL NAME *',
      email: 'EMAIL (OPTIONAL)',
      willAttend: 'WILL YOU ATTEND? *',
      yes: "Yes, I'll be there!",
      no: "No, I can't make it",
      guestCount: 'NUMBER OF GUESTS *',
      guestNames: 'GUEST NAMES (IF MORE THAN 1) *',
      dietary: 'DIETARY REQUIREMENTS (OPTIONAL)',
      message: 'MESSAGE FOR THE COUPLE (OPTIONAL)',
      song: 'SONG SUGGESTION (OPTIONAL)',
      needsBus: 'I NEED TRANSPORT (BUS)',
      submit: 'Confirm',
      required: 'Please fill out the required fields.',
      thanksTitle: 'Thank You',
      thanksBody: 'For joining us on this special day. Your presence is the best gift we could receive.',
      thanksFrom: 'Milan & Jennifer',
    },
  },
  es: {
    topbar: { label: 'Nuestra Boda' },
    intro: {
      tapToContinue: 'Toca para continuar',
      invited: 'ESTÁS CORDIALMENTE INVITADO A',
      celebrateWeddingOf: 'CELEBRAR LA BODA DE',
      message:
        'Nos gustaría invitarte a celebrar con nosotros el día más especial de nuestras vidas. Sería un honor tenerte presente en este momento tan importante.',
      scroll: 'DESLIZA',
      names: { a: 'Milan', b: 'Jennifer' },
    },
    reveal: {
      title: 'Revelación',
      subtitle: 'RASPA PARA DESCUBRIR LA FECHA',
      completeMessage: 'Nos casamos',
      parts: { day: '06', month: 'Junio', year: '2026' },
    },
    countdown: {
      title: 'Cuenta atrás',
      until: 'hasta el gran día',
      units: { days: 'DÍAS', hours: 'HORAS', minutes: 'MIN', seconds: 'SEG' },
    },
    venue: {
      title: 'LA CELEBRACIÓN TENDRÁ LUGAR',
      extra: 'Extra: ilustración personalizada del lugar',
      at: 'EN',
      name: 'Villa Medicea di Artimino',
      address1: 'VIA DI PAPALEONE X, 28',
      address2: 'ARTIMINO, FLORENCIA',
      dateLine: '06 de Junio de 2026',
      follow: 'Recepción a continuación',
    },
    menu: {
      date: '06 Junio 2026',
      title: 'Menú',
      courses: [
        { label: 'APERITIVO', value: 'Selección de antipasti toscanos\nBruschetta, crostini y affettati misti' },
        { label: 'PRIMER PLATO', value: 'Risotto al tartufo nero di Norcia\ncon parmigiano reggiano 24 meses' },
        { label: 'SEGUNDO PLATO', value: 'Filete de ternera a la parrilla\ncon salsa al vino tinto y verduras de temporada' },
        { label: 'POSTRE', value: 'Tarta nupcial con crema de mascarpone\ny frutos del bosco frescos\n\nVinos de la finca' },
      ],
    },
    dressCode: {
      title: 'Código de vestimenta',
      body: 'Te invitamos a vestir de forma elegante y formal para celebrar con nosotros este día tan especial.',
      attire: 'Vestimenta formal',
      avoid: 'Por favor, evita llevar blanco',
    },
    gifts: {
      title: 'Regalos',
      body:
        'Tu presencia es el mejor regalo que podríamos recibir. Sin embargo, si deseas contribuir a nuestra nueva vida juntos, puedes hacerlo por transferencia bancaria.',
      love: 'Con todo nuestro cariño',
      bankDetails: 'DATOS BANCARIOS',
      accountHolder: 'TITULAR: MILAN & JENNIFER',
      iban: 'IBAN: ES00 0000 0000 0000 0000 0000',
      reference: 'CONCEPTO: Boda Milan & Jennifer',
    },
    transport: {
      title: 'Transporte',
      body:
        'Hemos organizado autobuses desde el centro de Florencia hasta la villa para que puedas disfrutar de la celebración sin preocupaciones.',
      busDeparture: 'SALIDA DEL AUTOBÚS',
      busDeparturePlace: 'Piazza della Signoria',
      busDepartureTime: '16:00h',
      returnTo: 'REGRESO A FLORENCIA',
      returnTime: '02:00h',
      note: 'Indica en tu confirmación si necesitas transporte',
    },
    rsvp: {
      title: 'Confirma tu asistencia',
      subtitle: 'Este formulario es totalmente personalizable',
      fullName: 'NOMBRE COMPLETO *',
      email: 'CORREO (OPCIONAL)',
      willAttend: '¿ASISTIRÁS? *',
      yes: '¡Sí, estaré allí!',
      no: 'No puedo asistir',
      guestCount: 'NÚMERO DE INVITADOS *',
      guestNames: 'NOMBRES DE INVITADOS (SI MÁS DE 1) *',
      dietary: 'REQUISITOS DIETÉTICOS (OPCIONAL)',
      message: 'MENSAJE PARA LOS NOVIOS (OPCIONAL)',
      song: 'CANCIÓN SUGERIDA (OPCIONAL)',
      needsBus: 'NECESITO TRANSPORTE (AUTOBÚS)',
      submit: 'Confirmar',
      required: 'Por favor, completa los campos obligatorios.',
      thanksTitle: 'Gracias',
      thanksBody: 'Por acompañarnos en este día tan especial. Tu presencia es el mejor regalo que podríamos recibir.',
      thanksFrom: 'Milan & Jennifer',
    },
  },
}

