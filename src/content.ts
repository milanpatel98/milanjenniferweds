export type Lang = 'en' | 'it'

export type Copy = {
  topbar: { label: string; buyNow: string }
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
    hint: string
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
    topbar: { label: 'Teatro Demo', buyNow: 'Buy now' },
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
      hint: 'Scratch all three circles to continue',
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
  it: {
    topbar: { label: 'Teatro Demo', buyNow: 'Acquista' },
    intro: {
      tapToContinue: 'Tocca per continuare',
      invited: 'SEI CORDIALMENTE INVITATO A',
      celebrateWeddingOf: 'CELEBRARE IL MATRIMONIO DI',
      message:
        'Vorremmo invitarti a festeggiare con noi il giorno più speciale della nostra vita. Sarebbe un onore averti con noi in questo momento importante.',
      scroll: 'SCORRI',
      names: { a: 'Milan', b: 'Jennifer' },
    },
    reveal: {
      title: 'Rivelazione',
      subtitle: 'GRATTA PER SCOPRIRE LA DATA',
      hint: 'Gratta tutti e tre i cerchi per continuare',
      parts: { day: '06', month: 'Giugno', year: '2026' },
    },
    countdown: {
      title: 'Conto alla rovescia',
      until: 'al grande giorno',
      units: { days: 'GIORNI', hours: 'ORE', minutes: 'MIN', seconds: 'SEC' },
    },
    venue: {
      title: 'LA CELEBRAZIONE SI TERRÀ',
      extra: 'Extra: illustrazione personalizzata della location',
      at: 'A',
      name: 'Villa Medicea di Artimino',
      address1: 'VIA DI PAPALEONE X, 28',
      address2: 'ARTIMINO, FIRENZE',
      dateLine: '06 Giugno 2026',
      follow: 'A seguire il ricevimento',
    },
    menu: {
      date: '06 Giugno 2026',
      title: 'Menu',
      courses: [
        { label: 'APERITIVO', value: 'Selezione di antipasti toscani\nBruschette, crostini & affettati misti' },
        { label: 'PRIMO', value: 'Risotto al tartufo nero di Norcia\ncon parmigiano reggiano 24 mesi' },
        { label: 'SECONDO', value: 'Filetto di manzo alla griglia\ncon salsa al vino rosso e verdure di stagione' },
        { label: 'DOLCE', value: 'Torta nuziale con crema al mascarpone\ne frutti di bosco freschi\n\nVini della Tenuta' },
      ],
    },
    dressCode: {
      title: 'Dress code',
      body: 'Ti invitiamo a vestirti in modo elegante e formale per celebrare con noi questo giorno speciale.',
      attire: 'Abito formale',
      avoid: 'Si prega di evitare il bianco',
    },
    gifts: {
      title: 'Regali',
      body:
        'La tua presenza è il regalo più bello. Tuttavia, se desideri contribuire alla nostra nuova vita insieme, puoi farlo tramite bonifico.',
      love: 'Con tutto il nostro amore',
      bankDetails: 'COORDINATE BANCARIE',
      accountHolder: 'INTESTATARIO: MILAN & JENNIFER',
      iban: 'IBAN: ES00 0000 0000 0000 0000 0000',
      reference: 'CAUSALE: Matrimonio Milan & Jennifer',
    },
    transport: {
      title: 'Trasporti',
      body:
        'Abbiamo organizzato autobus dal centro di Firenze alla villa così potrai goderti la festa senza pensieri.',
      busDeparture: 'PARTENZA BUS',
      busDeparturePlace: 'Piazza della Signoria',
      busDepartureTime: '16:00',
      returnTo: 'RITORNO A FIRENZE',
      returnTime: '02:00',
      note: 'Indica nell’RSVP se hai bisogno del trasporto',
    },
    rsvp: {
      title: 'Conferma la tua presenza',
      subtitle: 'Questo modulo è completamente personalizzabile',
      fullName: 'NOME E COGNOME *',
      email: 'EMAIL (OPZIONALE)',
      willAttend: 'PARTECIPERAI? *',
      yes: 'Sì, ci sarò!',
      no: 'No, non posso',
      guestCount: 'NUMERO DI OSPITI *',
      guestNames: 'NOMI OSPITI (SE PIÙ DI 1) *',
      dietary: 'ESIGENZE ALIMENTARI (OPZIONALE)',
      message: 'MESSAGGIO PER GLI SPOSI (OPZIONALE)',
      song: 'CANZONE SUGGERITA (OPZIONALE)',
      needsBus: 'HO BISOGNO DEL TRASPORTO (BUS)',
      submit: 'Conferma',
      required: 'Compila i campi obbligatori.',
      thanksTitle: 'Grazie',
      thanksBody: 'Per essere con noi in questo giorno speciale. La tua presenza è il regalo più bello.',
      thanksFrom: 'Milan & Jennifer',
    },
  },
}

