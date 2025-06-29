// products data stub
export type Product = {
  id: string;
  name: { ru: string; be: string };
  description: { ru: string; be: string };
  price: string;
  note: { ru: string; be: string };
  available: boolean;
  gallery: string[];
};

export const products: Product[] = [
  {
    id: 'pine-bark-50l',
    name: {
      ru: 'Кора сосновая, 5-20 мм',
      be: 'Сасновая кара, 5-20 мм',
    },
    description: {
      ru: 'Фракция 5-20 мм, уп. 50 литров',
      be: 'Фракцыя 5-20 мм, уп. 50 літраў',
    },
    price: '13 руб.',
    note: {
      ru: 'только оптом',
      be: 'толькі аптам',
    },
    available: true,
    gallery: [
      '/productPhoto/pine-bark-50l.png',
      '/productPhoto/pine-bark-50l2.png',
      '/productPhoto/pine-bark-50l3.png'
    ]
  },
  {
    id: 'bark-economy-70l',
    name: {
      ru: 'Кора-мульча, "ЭКОНОМ", смешанная фракция',
      be: 'Кара-мульча, "ЭКАНОМ", змешаная фракцыя',
    },
    description: {
      ru: 'Смешанная фракция 35% мелкая, 55% средняя, 10% крупная, уп. 70 литров',
      be: 'Смешаная фракцыя 35% дробная, 55% сярэдняя, 10% буйная, уп. 70 літраў',
    },
    price: '17,50 руб.',
    note: {
      ru: 'только оптом',
      be: 'толькі аптам',
    },
    available: true,
    gallery: [
      '/productPhoto/bark-economy-70l.png',
      '/productPhoto/bark-economy-70l2.png',
    ] // фото добавите позже
  },
  {
    id: 'pine-bark-50-120mm-50l',
    name: {
      ru: 'Кора сосновая, 50-120 мм',
      be: 'Сасновая кара, 50-120 мм',
    },
    description: {
      ru: 'Фракция 50-120 мм, уп. 50 литров',
      be: 'Фракцыя 50-120 мм, уп. 50 літраў',
    },
    price: '13 руб.',
    note: {
      ru: 'только оптом',
      be: 'толькі аптам',
    },
    available: true,
    gallery: [
      '/productPhoto/pine-bark-50-120mm-50l.png',
      '/productPhoto/pine-bark-50-120mm-50l2.png',
      '/productPhoto/pine-bark-50-120mm-50l3.png',
    ]
  },
  {
    id: 'pine-bark-20-40mm-50l',
    name: {
      ru: 'Кора-мульча, 20-40 мм',
      be: 'Кара-мульча, 20-40 мм',
    },
    description: {
      ru: 'Фракция 20-40 мм, уп. 50 литров',
      be: 'Фракцыя 20-40 мм, уп. 50 літраў',
    },
    price: '13 руб.',
    note: {
      ru: 'только оптом',
      be: 'толькі аптам',
    },
    available: true,
    gallery: [
      '/productPhoto/pine-bark-20-40mm-50l.png',
      '/productPhoto/pine-bark-20-40mm-50l2.png',
      '/productPhoto/pine-bark-20-40mm-50l3.png',
    ]
  },
  // Можно добавить больше товаров по аналогии
]; 