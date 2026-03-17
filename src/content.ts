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
    timeLine: string
    follow: string
    receptionName: string
    receptionAddress1: string
    receptionAddress2: string
    receptionDateLine: string
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
    directionsLabel: string
    ceremonyCta: string
    receptionCta: string
  }
  rsvp: {
    title: string
    fullName: string
    fullNamePlaceholder: string
    email: string
    emailPlaceholder: string
    willAttend: string
    yes: string
    no: string
    guestCount: string
    guestNames: string
    message: string
    messagePlaceholder: string
    submit: string
    required: string
    thanksTitle: string
    thanksBody: string
    thanksFrom: string
    seeYouAtWedding: string
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
      completeMessage: "We're getting married!",
      parts: { day: '06', month: 'June', year: '2026' },
    },
    countdown: {
      title: 'Countdown',
      until: 'until the big day',
      units: { days: 'DAYS', hours: 'HOURS', minutes: 'MIN', seconds: 'SEC' },
    },
    venue: {
      title: 'THE CELEBRATION WILL TAKE PLACE',
      extra: '💍',
      at: 'AT',
      name: 'St. Thomas Catholic Church',
      address1: '1450 S Melrose Dr',
      address2: 'Oceanside, CA 92056',
      dateLine: 'June 06, 2026',
      timeLine: 'at 1:00 pm',
      follow: 'Reception to Follow',
      receptionName: 'Aria Event Hall',
      receptionAddress1: '740 Nordahl Rd Ste 125',
      receptionAddress2: 'San Marcos, CA 92069',
      receptionDateLine: 'at 4:30 pm',
    },
    menu: {
      date: '06 June 2026',
      title: 'Menu',
      courses: [],
    },
    dressCode: {
      title: 'Dress Code',
      body: 'We invite you to dress elegantly and formally to celebrate this special day with us.',
      attire: 'Formal Attire',
      avoid: 'Please avoid wearing White, Beige and Red',
    },
    gifts: {
      title: 'Gifts',
      body: 'Your presence is the best gift we could receive. Your love and support mean the world to us.',
      love: 'With all our love',
      bankDetails: 'BANK DETAILS',
      accountHolder: 'ACCOUNT HOLDER: MILAN & JENNIFER',
      iban: 'IBAN: ES00 0000 0000 0000 0000 0000',
      reference: 'REFERENCE: Milan & Jennifer Wedding',
    },
    transport: {
      title: 'Getting There',
      body:
        'Tap below to open directions in your maps app. We recommend driving or using your preferred ride-share to reach the ceremony and reception.',
      directionsLabel: 'Directions',
      ceremonyCta: 'Ceremony',
      receptionCta: 'Reception',
    },
    rsvp: {
      title: 'Confirm your attendance',
      fullName: 'FULL NAME *',
      fullNamePlaceholder: 'Your name',
      email: 'EMAIL (OPTIONAL)',
      emailPlaceholder: 'your@email.com',
      willAttend: 'WILL YOU ATTEND? *',
      yes: "Yes, I'll be there!",
      no: "No, I can't make it",
      guestCount: 'NUMBER OF GUESTS *',
      guestNames: 'GUEST NAMES (IF MORE THAN 1) *',
      message: 'MESSAGE FOR THE COUPLE (OPTIONAL)',
      messagePlaceholder: 'Write us a few words...',
      submit: 'Confirm',
      required: 'Please fill out the required fields.',
      thanksTitle: 'Thank You',
      thanksBody: 'For joining us on this special day.\nYour presence is the best gift\nwe could receive.',
      thanksFrom: 'Milankumar patel &\nJennifer carina huitron cortes',
      seeYouAtWedding: 'See you at the wedding',
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
      completeMessage: 'Nos casamos !',
      parts: { day: '06', month: 'Junio', year: '2026' },
    },
    countdown: {
      title: 'Cuenta atrás',
      until: 'hasta el gran día',
      units: { days: 'DÍAS', hours: 'HORAS', minutes: 'MIN', seconds: 'SEG' },
    },
    venue: {
      title: 'LA CELEBRACIÓN TENDRÁ LUGAR',
      extra: '💍',
      at: 'EN',
      name: 'St. Thomas Catholic Church',
      address1: '1450 S Melrose Dr',
      address2: 'Oceanside, CA 92056',
      dateLine: '06 de Junio de 2026',
      timeLine: 'Misa a la 1:00 pm',
      follow: 'Recepción',
      receptionName: 'Aria Event Hall',
      receptionAddress1: '740 Nordahl Rd Ste 125',
      receptionAddress2: 'San Marcos, CA 92069',
      receptionDateLine: 'a las 4:30 pm',
    },
    menu: {
      date: '06 Junio 2026',
      title: 'Menú',
      courses: [],
    },
    dressCode: {
      title: 'Código de vestimenta',
      body: 'Te invitamos a vestir elegante y formal para celebrar con nosotros este día tan especial.',
      attire: 'Vestimenta formal',
      avoid: 'Por favor, evita llevar blanco, beige y rojo',
    },
    gifts: {
      title: 'Regalos',
      body: 'Tu presencia es el mejor regalo que podríamos recibir. Tu amor y apoyo significan el mundo para nosotros.',
      love: 'Con todo nuestro cariño',
      bankDetails: 'DATOS BANCARIOS',
      accountHolder: 'TITULAR: MILAN & JENNIFER',
      iban: 'IBAN: ES00 0000 0000 0000 0000 0000',
      reference: 'CONCEPTO: Boda Milan & Jennifer',
    },
    transport: {
      title: 'Cómo llegar',
      body:
        'Toca abajo para abrir las indicaciones en tu app de mapas. Te recomendamos ir en coche o usar tu app de transporte preferida para llegar a la ceremonia y la recepción.',
      directionsLabel: 'Indicaciones',
      ceremonyCta: 'Ceremonia',
      receptionCta: 'Recepción',
    },
    rsvp: {
      title: 'Confirma tu asistencia',
      fullName: 'NOMBRE COMPLETO *',
      fullNamePlaceholder: 'Tu nombre',
      email: 'CORREO (OPCIONAL)',
      emailPlaceholder: 'tu@email.com',
      willAttend: '¿ASISTIRÁS? *',
      yes: '¡Sí, estaré allí!',
      no: 'No puedo asistir',
      guestCount: 'NÚMERO DE INVITADOS *',
      guestNames: 'NOMBRES DE INVITADOS (SI MÁS DE 1) *',
      message: 'MENSAJE PARA LOS NOVIOS (OPCIONAL)',
      messagePlaceholder: 'Escríbenos unas palabras...',
      submit: 'Confirmar',
      required: 'Por favor, completa los campos obligatorios.',
      thanksTitle: 'Gracias',
      thanksBody: 'Por acompañarnos en este día tan especial.\nTu presencia es el mejor regalo\nque podríamos recibir.',
      thanksFrom: 'Milankumar patel &\nJennifer carina huitron cortes',
      seeYouAtWedding: 'Nos vemos en la boda',
    },
  },
}

