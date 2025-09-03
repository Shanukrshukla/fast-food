export type MenuItem = {
  id: string
  name: string
  price: number
  category: "Noodles" | "Momos" | "Rice" | "Starters" | "Soups" | "Combos"
  description: string
  spicy?: boolean
  veg?: boolean
  imageQuery?: string
}

export const MENU: MenuItem[] = [
  {
    id: "hakka-noodles",
    name: "Hakka Noodles",
    price: 149,
    category: "Noodles",
    description: "Stir-fried noodles tossed with crunchy veggies and soy.",
    veg: true,
    imageQuery: "hakka noodles in bowl",
  },
  {
    id: "schezwan-noodles",
    name: "Schezwan Noodles",
    price: 169,
    category: "Noodles",
    description: "Fiery, garlicky noodles with signature Schezwan sauce.",
    spicy: true,
    veg: true,
    imageQuery: "schezwan noodles red sauce",
  },
  {
    id: "veg-momos",
    name: "Veg Momos (8pc)",
    price: 129,
    category: "Momos",
    description: "Steamed dumplings filled with seasoned vegetables.",
    veg: true,
    imageQuery: "veg momos dumplings",
  },
  {
    id: "chicken-momos",
    name: "Chicken Momos (8pc)",
    price: 159,
    category: "Momos",
    description: "Juicy chicken dumplings served with spicy chutney.",
    imageQuery: "chicken momos dumplings",
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    price: 149,
    category: "Rice",
    description: "Classic wok-tossed rice with mixed vegetables.",
    veg: true,
    imageQuery: "veg fried rice chinese",
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    price: 199,
    category: "Starters",
    description: "Crispy paneer tossed in tangy chilli sauce with peppers.",
    spicy: true,
    veg: true,
    imageQuery: "chilli paneer dry",
  },
  {
    id: "manchow-soup",
    name: "Veg Manchow Soup",
    price: 119,
    category: "Soups",
    description: "Comforting soup topped with crispy noodles.",
    veg: true,
    imageQuery: "manchow soup chinese",
  },
  {
    id: "combo-veg-delight",
    name: "Veg Delight Combo",
    price: 249,
    category: "Combos",
    description: "Hakka Noodles + Veg Manchurian (dry) + Drink.",
    veg: true,
    imageQuery: "chinese combo box noodles manchurian",
  },
]

export const CATEGORIES = [
  { label: "Noodles", q: "noodles" },
  { label: "Momos", q: "momos" },
  { label: "Rice", q: "rice" },
  { label: "Starters", q: "starters" },
  { label: "Soups", q: "soups" },
  { label: "Combos", q: "combos" },
] as const
