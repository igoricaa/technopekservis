export type Client = {
  name: string;
  image: string;
};

export const clients: Client[] = [
  {
    name: 'Učenički centar Beograd',
    image: '/ucenicki-centar-beograd.webp',
  },
  {
    name: 'Pekara Denis',
    image: '/pekara-denis.png',
  },
  {
    name: 'OMV pumpe',
    image: '/omv.svg',
  },
  {
    name: 'Hleb i kifle',
    image: '/hleb-i-kifle-logo.webp',
  },
  {
    name: 'Pekara Gak',
    image: '/pekara-gak.png',
  },
  {
    name: 'Pekara Lulu',
    image: '/pekara-lulu.png',
  },
  {
    name: 'Marmil trgovine',
    image: '/marmil-trgovine.png',
  },
  {
    name: 'Put Gross',
    image: '/put-gross.png',
  },
  {
    name: 'Dom učenika Knjaževac',
    image: '/dom-ucenika-knjazevac.webp',
  },
  {
    name: 'Super Vero',
    image: '/super-vero-srbija.png',
  },
  {
    name: 'Vojna ustanova Tara',
    image: '/vojna-ustanova-tara.webp',
  },
  {
    name: 'Studentski centar Niš',
    image: '/studentski-centar-nis.webp',
  },
  {
    name: 'Dom učenika Kraljevo',
    image: '/dom-ucenika-kraljevo.webp',
  },
  {
    name: 'Dom učenika Knjaževac',
    image: '/dom-ucenika-knjazevac.webp',
  },
  {
    name: 'Feniks slatka kuća',
    image: '/feniks-slatka-kuca.webp',
  },
  {
    name: 'Pekara Kim',
    image: '/pekara-kim.webp',
  },
  {
    name: 'Lebovski pekare',
    image: '/lebovski-pekare.png',
  },
  {
    name: 'Predškolska ustanova Nata Veljković',
    image: '/predskolska-ustanova-nata-veljkovic.webp',
  },
  {
    name: 'Predškolska ustanova Radost',
    image: '/predskolska-ustanova-radost.webp',
  },
  {
    name: 'Sportski centar Subotica',
    image: '/scSubotica.webp',
  },
  {
    name: 'Shambhala',
    image: '/shambhala.svg',
  },
  {
    name: 'Srednja škola Sveti Trifun',
    image: '/srednja-skola-sveti-trifun.webp',
  },
  {
    name: 'Kafeterija',
    image: '/kafeterija.png',
  },
  {
    name: 'Pekara Đuković',
    image: '/pekara-djukovic.webp',
  },
  {
    name: 'Tropic',
    image: '/tropic.jpg',
  },
];

export type BakeryExample = {
  title: string;
  slug: string;
  description: string;
  link: string;
  image: string;
  equipment: string[];
};

export const bakeryExamples: BakeryExample[] = [
  {
    title: 'Pekare za površine do 30 m²',
    slug: 'pekare-za-povrsine-do-30-m2',
    description: 'Primer pekarskog prostora do 30 m²',
    link: '/tvoja-pekara/pekare-za-povrsine-do-30-m2',
    image: '/tvoja-pekara/pekara-za-povrsine-do-30-m2.webp',
    equipment: [
      'Spiral Mixer Spiral EvO TL 110',
      'Planetary mixer Saturne 3',
      'Table top dough sheeter Rhea',
      'Refrigerated workbench BTP',
      'Mobile tub storage table with motorised flour duster Paneodust',
      'Electric deck oven Orion EvO 801/4.120 with integrated lifter',
      'Paneotrad EvO',
      'Blast freezer BSP 46.15',
      'Convection oven Krystal 46.10',
      'Roll-In Retarder-proofer single-compartment BFM 600x800',
      'Retarder proofer cabinet BFA 400x600',
    ],
  },
  {
    title: 'Pekare za površine do 50 m²',
    slug: 'pekare-za-povrsine-do-50-m2',
    description: 'Primer pekarskog prostora do 50 m²',
    link: '/tvoja-pekara/pekare-za-povrsine-do-50-m2',
    image: '/tvoja-pekara/pekara-za-povrsine-do-50-m2.webp',
    equipment: [
      'Water cooler Fonto',
      'Water meter Domix',
      'Spiral mixer Spiral EvO',
      'Mobile dough vat holder on casters',
      'Hydraulic dough divider Divimach',
      'Refrigerated workbench BTP',
      'Refrigerated workbench BTP',
      'Convection oven Krystal 46.10',
      'Modular oven Soleo M4',
      'Dough sheeter Rhea 600LC',
      'Spiral mixer Spiral EvO',
      'Blast freezer BSP',
      'Retarder proofer cabinet BFA Danish model 400x600',
    ],
  },
  {
    title: 'Pekare za površine do 80 m²',
    slug: 'pekare-za-povrsine-do-80-m2',
    description: 'Primer pekarskog prostora do 80 m²',
    link: '/tvoja-pekara/pekare-za-povrsine-do-80-m2',
    image: '/tvoja-pekara/pekara-za-povrsine-do-80-m2.webp',
    equipment: [
      'Water cooler Fonto',
      'Water meter Domix',
      'Spiral mixer Spiral EvO',
      'Mobile dough vat holder on casters',
      'Hydraulic dough divider Mercure 4',
      'Intermediate (chest type) proofer cabinet RP4',
      'Moulder Major',
      'Roll-in retarder proofer BFC',
      'rack oven 8.64E',
    ],
  },
  {
    title: 'Pekare za površine do 100 m²',
    slug: 'pekare-za-povrsine-do-100-m2',
    description: 'Primer pekarskog prostora do 100 m²',
    link: '/tvoja-pekara/pekare-za-povrsine-do-100-m2',
    image: '/tvoja-pekara/pekara-za-povrsine-do-100-m2.webp',
    equipment: [
      'Water cooler Fonto',
      'Electric deck oven Orion EvO with integrated lifter',
      'Spiral mixer Spiral EvO',
      'Roll-in retarder proofer BFC 2x3 racks 600x800',
      'Doser meter Domix',
      'Spiral mixer Spiral EvO',
      'Mobile dough vat holder on casters',
      'Hydraulic divider Mercure 4',
      'Bun divider and rounder Eris SA',
      'Intermediate (chest type) proofer cabinet RP4',
      'Moulder Major',
      'Retarder proofer cabinet BFA danish model 400x600',
      'Roll-in blast freezer BSC',
      'Combinated blast freezer and conservation unit BSCP',
      'Refrigerated workbench BTP 30',
      'Refrigerated workbench BTP 40',
      'Convection oven Krystal 46.10',
      'Planetary mixer Saturne 3',
    ],
  },
];

export type Partner = {
  name: string;
  description: string;
  logo: {
    src: string;
    aspectRatio?: string;
  };
  link?: string;
};

export const partners: Partner[] = [
  {
    name: 'Winterhalter',
    description:
      'Porodična kompanija sa predanim osobljem. Mreža profesionalnih partnera. Ovo je osnova na kojoj Winterhalter razvija rešenja za komercijalno pranje posuđa. Za dobrobit naših kupaca širom sveta.',
    logo: {
      src: '/partneri/winterhalter-logo.webp',
      aspectRatio: 'aspect-[1549/591]',
    },
    link: 'https://www.winterhalter.com/',
  },
  {
    name: 'Termicom D.O.O.',
    description:
      'Termicom kompanija se više od dvadeset godina, veoma uspešno, bavi prodajom ugostiteljske opreme, rezervnih delova, sredstava za pranje i servisiranjem rashladnih uređaja na teritoriji cele Republike Srbije.',
    logo: {
      src: '/partneri/termicom-logo.webp',
      aspectRatio: 'aspect-square',
    },
    link: 'https://termicom.rs/',
  },
  {
    name: 'Fisti D.O.O.',
    description:
      'Fisti d.o.o je mlada firma,osnovana 2008 u Ljubljani,sa poslovnom strategijom u oblasti ekologije. Na slovenačkom tržištu, tržištima bivše Jugoslavije i Albanije nudimo profesionalne vodene filtere preduzeća BRITA GmbH i rešenja za smanjenje otpada i manipulativnih troškova.',
    logo: {
      src: '/partneri/fisti-logo.webp',
      aspectRatio: 'aspect-square',
    },
    link: 'https://www.fisti.si/sr/',
  },
  {
    name: 'Quorum D.O.O.',
    description:
      'Quorum se nalazi na opstini Čačak, mesto Čačak, adresa Đorđa Popovića 34. Matični broj preduzeća je 17047264. Privredno društvo za proizvodnju, promet, trgovinu i usluge Quorum doo Čačak je osnovano 08.11.1995. godine.',
    logo: {
      src: '/partneri/quorum-logo.svg',
      aspectRatio: 'aspect-square',
    },
  },
  {
    name: 'Gastpro D.O.O.',
    description:
      'Preduzeće Gastpro osnovano je sa ciljem da na tržištu Srbije implementira tehnološki savremenu profesionalnu ugostiteljsku opremu. Proizvodni kapaciteti koji imaju za cilj preradu, obradu namirnica i jela, proizvodnju hrane kao poluproizvoda ili krajnjeg proizvoda su naši korisnici.',
    logo: {
      src: '/partneri/gastpro-logo.webp',
      aspectRatio: 'aspect-square',
    },
    link: 'https://www.gastpro.rs/sr',
  },
  {
    name: 'EuroGel',
    description:
      'Ljubav prema čokoladi, tortama i kolačima je učinila da izaberemo svoj profesionalni put upravo tamo gde je čokolade i slatkiša u izobilju!',
    logo: {
      src: '/partneri/euro-gel-logo.webp',
      aspectRatio: 'aspect-square',
    },
    link: 'https://www.eurogel.rs/',
  },
];

export const bongardVideos = [
  'https://www.youtube.com/embed/ErjdrQTpXWw',
  'https://www.youtube.com/embed/9W63J8xttCg',
  'https://www.youtube.com/embed/O2m-yPeTY5k',
];

export const wiesheuVideos = [
  'https://www.youtube.com/embed/Pp-optbyEL4',
  'https://www.youtube.com/embed/x7Rxj1WnDcw',
  'https://www.youtube.com/embed/G6aFro9y7SE',
];
