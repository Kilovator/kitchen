import { Recipe, ScanPreset, Supermarket } from '../types';
import { DESSERT_RECIPES } from './recipes/desserts';
import { SOUP_RECIPES } from './recipes/soups';
import { MAIN_RECIPES } from './recipes/mains';
import { SNACK_RECIPES } from './recipes/snacks';
import { BREAKFAST_RECIPES } from './recipes/breakfasts';
import { HEALTHY_RECIPES } from './recipes/healthy';
import { FAST_RECIPES } from './recipes/fast';

export const RECIPES_DATA: Recipe[] = [
  ...SOUP_RECIPES,
  ...MAIN_RECIPES,
  ...DESSERT_RECIPES,
  ...SNACK_RECIPES,
  ...BREAKFAST_RECIPES,
  ...HEALTHY_RECIPES,
  ...FAST_RECIPES,
];

export const SCAN_PRESETS: Record<string, ScanPreset> = {
  borscht: {
    id: "borscht",
    title: { ru: "Борщ домашний со сметаной", en: "Homemade Beef Borscht", pl: "Domowy Barszcz z wołowiną" },
    calories: 380,
    protein: 22,
    fat: 18,
    carbs: 34,
    healthScore: { ru: "95% (Хороший баланс)", en: "95% (Great Balance)", pl: "95% (Świetny bilans)" },
    summary: {
      ru: "Традиционный суп с высокой питательной ценностью.",
      en: "Traditional soup high in nutrients and protein.",
      pl: "Tradycyjna zupa o wysokiej wartości odżywczej."
    },
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },
  tacos: {
    id: "tacos",
    title: { ru: "Мексиканские Тако с говядиной", en: "Mexican Beef Tacos", pl: "Meksykańskie Tacos z wołowiną" },
    calories: 450,
    protein: 28,
    fat: 22,
    carbs: 38,
    healthScore: { ru: "90% (Сбалансированное мексиканское блюдо)", en: "90% (Balanced Mexican Dish)", pl: "90% (Zrównoważone meksykańskie danie)" },
    summary: {
      ru: "Богатый источник белка и полезных жиров авокадо.",
      en: "Rich in protein and healthy avocado fats.",
      pl: "Bogate źródło białka i zdrowych tłuszczów z awokado."
    },
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  },
  butter_chicken: {
    id: "butter_chicken",
    title: { ru: "Курица Карри по-индийски", en: "Indian Butter Chicken Curry", pl: "Indyjskie Butter Chicken Curry" },
    calories: 560,
    protein: 36,
    fat: 28,
    carbs: 24,
    healthScore: { ru: "91% (Сочный протеиновый обед)", en: "91% (Rich Protein Lunch)", pl: "91% (Sycący obiad białkowy)" },
    summary: {
      ru: "Пряный куриный карри, богатый нежирным белком и специями.",
      en: "Spiced chicken curry rich in lean protein and antioxidants.",
      pl: "Aromatyczne curry z kurczaka bogate w białko i antyoksydanty."
    },
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
  },
  ribeye: {
    id: "ribeye",
    title: { ru: "Стейк Рибай Medium Rare", en: "Ribeye Steak Medium Rare", pl: "Stek Ribeye Medium Rare" },
    calories: 640,
    protein: 48,
    fat: 42,
    carbs: 4,
    healthScore: { ru: "92% (Высокобелковый)", en: "92% (High Protein)", pl: "92% (Wysokobiałkowy)" },
    summary: {
      ru: "Богат аминокислотами и железом.",
      en: "Rich in amino acids and iron.",
      pl: "Bogaty w aminokwasy i żelazo."
    },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  carbonara: {
    id: "carbonara",
    title: { ru: "Спагетти Карбонара", en: "Spaghetti Carbonara", pl: "Spaghetti Carbonara" },
    calories: 520,
    protein: 24,
    fat: 22,
    carbs: 58,
    healthScore: { ru: "85% (Итальянская классика)", en: "85% (Italian Classic)", pl: "85% (Włoski Klasyk)" },
    summary: {
      ru: "Сытная паста с энергией медленных углеводов.",
      en: "Satisfying pasta providing protein and energy.",
      pl: "Sycący makaron zapewniający energię."
    },
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
  }
};

export const SUPERMARKETS: Supermarket[] = [
  {
    id: "s1",
    name: "Biedronka",
    logo: "🐞",
    priceMultiplier: 0.92,
    distanceMeters: 310,
    walkTime: { pl: "4 min pieszo", en: "4 min walk", ru: "4 мин пешком" },
    badge: { pl: "Najniższa cena", en: "Best Price", ru: "Лучшая цена" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.biedronka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Biedronka",
    lat: 52.2315,
    lng: 21.0105,
    address: { pl: "ul. Marszałkowska 104, Warszawa", en: "104 Marszalkowska St, Warsaw", ru: "ул. Маршаловская 104, Варшава" }
  },
  {
    id: "s2",
    name: "Lidl",
    logo: "🟡",
    priceMultiplier: 0.94,
    distanceMeters: 550,
    walkTime: { pl: "7 min pieszo", en: "7 min walk", ru: "7 мин пешком" },
    badge: { pl: "Gwarancja jakości", en: "Quality Guarantee", ru: "Гарантия качества" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.lidl.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lidl",
    lat: 52.2270,
    lng: 21.0060,
    address: { pl: "Aleje Jerozolimskie 56, Warszawa", en: "56 Jerozolimskie Ave, Warsaw", ru: "Аллеи Иерусалимские 56, Варшава" }
  },
  {
    id: "s3",
    name: "Żabka (Nano / Jush)",
    logo: "🐸",
    priceMultiplier: 1.14,
    distanceMeters: 140,
    walkTime: { pl: "15 min dostawa", en: "15 min delivery", ru: "Доставка 15 мин" },
    badge: { pl: "Dostawa w 15 min", en: "15 min Delivery", ru: "Доставка за 15 мин" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.zabka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Zabka",
    lat: 52.2305,
    lng: 21.0130,
    address: { pl: "ul. Nowy Świat 22, Warszawa", en: "22 Nowy Swiat St, Warsaw", ru: "ул. Новый Свят 22, Варшава" }
  },
  {
    id: "s4",
    name: "Carrefour Market",
    logo: "🔵",
    priceMultiplier: 1.04,
    distanceMeters: 620,
    walkTime: { pl: "8 min pieszo", en: "8 min walk", ru: "8 мин пешком" },
    badge: { pl: "Duży выбор", en: "Wide Selection", ru: "Широкий выбор" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.carrefour.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrefour",
    lat: 52.2240,
    lng: 21.0180,
    address: { pl: "ul. Wołoska 12, Warszawa", en: "12 Woloska St, Warsaw", ru: "ул. Волоская 12, Варшава" }
  },
  {
    id: "s5",
    name: "Auchan Supermarket",
    logo: "🔴",
    priceMultiplier: 0.90,
    distanceMeters: 1100,
    walkTime: { pl: "14 min pieszo", en: "14 min walk", ru: "14 мин пешком" },
    badge: { pl: "Super ceny", en: "Super Prices", ru: "Супер цены" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.auchan.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Auchan",
    lat: 52.2360,
    lng: 21.0020,
    address: { pl: "ul. Modlińska 8, Warszawa", en: "8 Modlinska St, Warsaw", ru: "ул. Модлиньская 8, Варшава" }
  },
  {
    id: "s6",
    name: "Dino",
    logo: "🟢",
    priceMultiplier: 0.95,
    distanceMeters: 780,
    walkTime: { pl: "10 min pieszo", en: "10 min walk", ru: "10 мин пешком" },
    badge: { pl: "Blisko Ciebie", en: "Close to You", ru: "Рядом с вами" },
    deliveryAvailable: true,
    deliveryUrl: "https://marketdino.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dino",
    lat: 52.2255,
    lng: 21.0150,
    address: { pl: "ul. Grójecka 45, Warszawa", en: "45 Grojecka St, Warsaw", ru: "ул. Груецкая 45, Варшава" }
  },
  {
    id: "s7",
    name: "Kaufland",
    logo: "⚪",
    priceMultiplier: 0.93,
    distanceMeters: 1250,
    walkTime: { pl: "15 min pieszo", en: "15 min walk", ru: "15 мин пешком" },
    badge: { pl: "Hipermarket", en: "Hypermarket", ru: "Гипермаркет" },
    deliveryAvailable: true,
    deliveryUrl: "https://www.kaufland.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kaufland",
    lat: 52.2380,
    lng: 21.0220,
    address: { pl: "ul. Biruty 18, Warszawa", en: "18 Biruty St, Warsaw", ru: "ул. Бируты 18, Варшава" }
  },
  {
    id: "s8",
    name: "Stokrotka",
    logo: "🌼",
    priceMultiplier: 1.06,
    distanceMeters: 420,
    walkTime: { pl: "5 min pieszo", en: "5 min walk", ru: "5 мин пешком" },
    badge: { pl: "Świeże i Eko", en: "Fresh & Eco", ru: "Свежие и Эко" },
    deliveryAvailable: true,
    deliveryUrl: "https://stokrotka.pl/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Stokrotka",
    lat: 52.2320,
    lng: 21.0170,
    address: { pl: "ul. Chmielna 15, Warszawa", en: "15 Chmielna St, Warsaw", ru: "ул. Хмельная 15, Варшава" }
  }
];
