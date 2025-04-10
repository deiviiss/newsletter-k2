import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const dummyMenus = [
    {
      id: '1',
      title: 'Potaje de lentejas con verduras y huevo',
      preparation: 'Lavar y desinfectar las verduras necesarias. Limpiar y lavar las lentejas. En una olla agregar las lentejas, ajo y sal; cocer a fuego medio. A medio cocer, agregar las verduras picadas. Servir con rebanadas de huevo cocido y acompañar con dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Lentejas', quantity: '99g', calories: 115.0, protein: 9.0, lipids: 0.4, carbs: 20.0 },
        { name: 'Huevo cocido', quantity: '30g', calories: 50.0, protein: 3.3, lipids: 3.7, carbs: 0.8 },
        { name: 'Zanahoria', quantity: '32g', calories: 13.0, protein: 0.2, lipids: 0.0, carbs: 2.4 },
        { name: 'Calabacita', quantity: '55g', calories: 11.0, protein: 0.4, lipids: 0.0, carbs: 2.7 },
        { name: 'Chayote', quantity: '40g', calories: 9.5, protein: 0.2, lipids: 0.2, carbs: 2.0 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 1.0, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-1_rftrsd',
        url: 'img-1_rftrsd'
      }
    },
    {
      id: '2',
      title: 'Pollo en caldo con verduras',
      preparation: 'Lavar y desinfectar las verduras. Lavar la carne, agregar limón y ajo; colocar en una olla con agua y cocer. Cuando hierva, agregar la pierna y el muslo. A media cocción, incorporar las verduras y cocinar a fuego medio hasta que estén suaves. Servir con dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Pierna y muslo de pollo', quantity: '80g', calories: 148.0, protein: 14.4, lipids: 9.6, carbs: 0.0 },
        { name: 'Zanahoria', quantity: '16g', calories: 6.5, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Jitomate', quantity: '40g', calories: 6.6, protein: 0.2, lipids: 0.0, carbs: 1.4 },
        { name: 'Calabacita', quantity: '55g', calories: 11.0, protein: 0.4, lipids: 0.0, carbs: 2.7 },
        { name: 'Chayote', quantity: '40g', calories: 9.5, protein: 0.2, lipids: 0.2, carbs: 2.0 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 1.0, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-2_yvrbce',
        url: 'img-2_yvrbce'
      }
    },
    {
      id: '3',
      title: 'Sopa de pasta con tortita de papa y zanahoria rallada',
      preparation: 'Lavar y desinfectar las verduras. Sancochar la papa con una pizca de sal, hacer puré y mezclar con la zanahoria rallada y huevo. Formar tortitas y freír. Para la sopa, licuar jitomate con cebolla y chile dulce, hervir y agregar pasta. Servir acompañado de dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Papa', quantity: '136g', calories: 116.0, protein: 2.6, lipids: 0.2, carbs: 27.4 },
        { name: 'Huevo', quantity: '60g', calories: 100.0, protein: 6.7, lipids: 7.3, carbs: 1.3 },
        { name: 'Aceite de canola', quantity: '5ml', calories: 44.0, protein: 0.0, lipids: 5.0, carbs: 0.0 },
        { name: 'Zanahoria', quantity: '64g', calories: 26.0, protein: 0.6, lipids: 0.2, carbs: 4.3 },
        { name: 'Pasta cocida', quantity: '30g', calories: 39.0, protein: 1.6, lipids: 0.5, carbs: 7.0 },
        { name: 'Jitomate', quantity: '28.2g', calories: 5.0, protein: 0.2, lipids: 0.0, carbs: 1.1 },
        { name: 'Cebolla', quantity: '13.2g', calories: 5.7, protein: 0.1, lipids: 0.0, carbs: 1.3 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-3_mamidr',
        url: 'img-3_mamidr'
      }
    },
    {
      id: '4',
      title: 'Albóndigas de pollo con arroz a la jardinera',
      preparation: 'Lavar y desinfectar las verduras. Revolver la carne molida con un huevo, sazonar, formar albóndigas y freír. Para el arroz a la jardinera, cocer arroz con verduras picadas, tapar y dejar reposar 15 minutos. Servir con una tortilla y fruta de temporada.',
      ingredients: [
        { name: 'Carne molida de pollo', quantity: '60g', calories: 68.0, protein: 14.0, lipids: 1.0, carbs: 0.0 },
        { name: 'Huevo fresco', quantity: '44g', calories: 63.0, protein: 5.5, lipids: 4.4, carbs: 0.3 },
        { name: 'Arroz', quantity: '47g', calories: 60.0, protein: 1.1, lipids: 0.1, carbs: 13.3 },
        { name: 'Granos de elote', quantity: '83g', calories: 66.0, protein: 2.3, lipids: 0.4, carbs: 16.2 },
        { name: 'Zanahoria picada', quantity: '16g', calories: 6.5, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Chícharos', quantity: '10g', calories: 8.5, protein: 0.5, lipids: 0.0, carbs: 1.5 },
        { name: 'Tortilla de maíz', quantity: '30g', calories: 64.0, protein: 0.5, lipids: 0.5, carbs: 13.7 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-4_hocccg',
        url: 'img-4_hocccg'
      }
    },
    {
      id: '5',
      title: 'Pollo entomatado con frijol colado',
      preparation: 'Lavar y desinfectar las verduras. Lavar la carne, agregar limón, ajo y cocer en agua. Preparar salsa licuada con jitomate, cebolla y aceite de canola. Servir la carne con frijol colado, dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Carne de pollo', quantity: '70g', calories: 84.0, protein: 7.9, lipids: 5.4, carbs: 0.0 },
        { name: 'Limón', quantity: '5ml', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Jitomate', quantity: '50g', calories: 12.5, protein: 0.4, lipids: 0.0, carbs: 1.8 },
        { name: 'Cebolla', quantity: '10g', calories: 11.5, protein: 0.4, lipids: 0.5, carbs: 2.7 },
        { name: 'Aceite de canola', quantity: '10g', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 0.0 },
        { name: 'Frijol colado', quantity: '37.5g', calories: 48.0, protein: 2.0, lipids: 0.2, carbs: 5.6 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 1.0, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-5_vr8adp',
        url: 'img-5_vr8adp'
      }
    },
    {
      id: '6',
      title: 'Pollo guisado con papa y zanahoria',
      preparation: 'Lavar y desinfectar las verduras. Lavar el pollo, agregar pimienta y limón; cocer junto con papa y zanahoria picadas en cuadritos. Servir con una tortilla y fruta de temporada.',
      ingredients: [
        { name: 'Pollo sin piel', quantity: '70g', calories: 84.0, protein: 7.9, lipids: 5.4, carbs: 0.0 },
        { name: 'Zanahoria', quantity: '16g', calories: 6.5, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Papa', quantity: '68g', calories: 59.0, protein: 1.3, lipids: 0.1, carbs: 13.7 },
        { name: 'Limón', quantity: '5ml', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Aceite de canola', quantity: '10ml', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 0.0 },
        { name: 'Tortilla de maíz', quantity: '30g', calories: 64.0, protein: 0.5, lipids: 0.5, carbs: 13.7 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-6_dpk9e9',
        url: 'img-6_dpk9e9'
      }
    },
    {
      id: '7',
      title: 'Brazo de reina con salsa de jitomate',
      preparation: 'Hervir las hojas de chaya para suavizarlas. Mezclar masa de maíz con aceite y sal, incorporar huevo cocido picado y pepita de calabaza molida. Formar el brazo de reina, envolver en hoja de plátano y cocer en vapor durante 90 minutos. Servir con salsa de jitomate y fruta de temporada.',
      ingredients: [
        { name: 'Huevo cocido', quantity: '60g', calories: 100.0, protein: 6.7, lipids: 7.3, carbs: 1.3 },
        { name: 'Jitomate', quantity: '56g', calories: 10.0, protein: 0.5, lipids: 0.1, carbs: 2.2 },
        { name: 'Cebolla', quantity: '10g', calories: 3.9, protein: 0.1, lipids: 0.1, carbs: 0.8 },
        { name: 'Chaya', quantity: '45g', calories: 10.0, protein: 1.3, lipids: 0.1, carbs: 1.7 },
        { name: 'Masa de maíz amarillo', quantity: '100g', calories: 189.0, protein: 4.4, lipids: 0.0, carbs: 38.5 },
        { name: 'Aceite de canola', quantity: '7.5ml', calories: 66.0, protein: 0.0, lipids: 7.5, carbs: 0.0 },
        { name: 'Pepita de calabaza molida', quantity: '10g', calories: 1.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-7_tnpmch',
        url: 'img-7_tnpmch'
      }
    },
    {
      id: '8',
      title: 'Huevo a la mexicana con frijol en caldo',
      preparation: 'En una cacerola, calentar agua y cocer frijoles con epazote. En una sartén, sofreír jitomate, cebolla, ajo y chile dulce. Agregar los huevos y cocinar al gusto. Servir con dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Huevo', quantity: '60g', calories: 92.7, protein: 7.5, lipids: 6.4, carbs: 0.7 },
        { name: 'Jitomate', quantity: '56g', calories: 10.0, protein: 0.5, lipids: 0.1, carbs: 2.2 },
        { name: 'Cebolla', quantity: '10g', calories: 3.9, protein: 0.1, lipids: 0.1, carbs: 0.8 },
        { name: 'Chile dulce', quantity: '5g', calories: 13.3, protein: 0.5, lipids: 0.3, carbs: 13.3 },
        { name: 'Frijol', quantity: '40g', calories: 119.0, protein: 7.6, lipids: 0.5, carbs: 21.8 },
        { name: 'Ajo', quantity: '2g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.3 },
        { name: 'Epazote', quantity: '3g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Aceite de canola', quantity: '2.5ml', calories: 22.0, protein: 0.0, lipids: 2.5, carbs: 0.0 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 1.0, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-8_c8madc',
        url: 'img-8_c8madc'
      }
    },
    {
      id: '9',
      title: 'Milanesa de pollo con verduras y sopa de pasta',
      preparation: 'Preparar milanesa de pollo: lavar, sazonar con limón y ajo, y cocinar a la plancha. Para la sopa, sofreír la pasta con un poco de aceite, licuar jitomate con agua y cocinar. Servir la milanesa con verduras al vapor, sopa, dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Milanesa de pollo', quantity: '70g', calories: 84.0, protein: 7.9, lipids: 5.4, carbs: 0.0 },
        { name: 'Zanahoria', quantity: '16g', calories: 6.0, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Jitomate', quantity: '28g', calories: 5.0, protein: 0.2, lipids: 0.0, carbs: 1.1 },
        { name: 'Sopa de fideos', quantity: '30g', calories: 111.0, protein: 3.7, lipids: 0.3, carbs: 22.5 },
        { name: 'Tortilla de maíz', quantity: '30g', calories: 64.0, protein: 0.5, lipids: 0.5, carbs: 13.7 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-9_wvpwot',
        url: 'img-9_wvpwot'
      }
    },
    {
      id: '10',
      title: 'Croquetas de atún con sopa de verduras',
      preparation: 'Cortar la zanahoria en cubos y sofreír junto con jitomate y cebolla. Agregar atún escurrido, huevo y perejil; salpimentar y mezclar. Formar croquetas empanizadas con polvo de pan y freír. Servir con sopa de verduras y acompañar con fruta de temporada.',
      ingredients: [
        { name: 'Zanahoria', quantity: '32g', calories: 13.0, protein: 0.2, lipids: 0.0, carbs: 2.4 },
        { name: 'Jitomate', quantity: '28g', calories: 5.0, protein: 0.2, lipids: 0.0, carbs: 1.1 },
        { name: 'Atún en agua', quantity: '66g', calories: 78.0, protein: 17.0, lipids: 0.6, carbs: 0.0 },
        { name: 'Huevo', quantity: '60g', calories: 100.0, protein: 6.7, lipids: 7.3, carbs: 1.3 },
        { name: 'Aceite de canola', quantity: '10g', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 0.0 },
        { name: 'Polvo de pan', quantity: '24g', calories: 99.0, protein: 3.1, lipids: 1.5, carbs: 17.7 },
        { name: 'Perejil', quantity: '2g', calories: 1.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-10_ilxyjw',
        url: 'img-10_ilxyjw'
      }
    },
    {
      id: '11',
      title: 'Pasta seca con verduras y cubitos de pollo a la plancha',
      preparation: 'Cocer la pasta en agua. Sofreír verduras (zanahoria, cebolla, jitomate, chícharos) y añadir cubitos de pollo a la plancha. Mezclar con la pasta y servir acompañado de fruta de temporada.',
      ingredients: [
        { name: 'Cubitos de pollo a la plancha', quantity: '70g', calories: 84.0, protein: 7.9, lipids: 5.4, carbs: 0.0 },
        { name: 'Pasta seca', quantity: '40g', calories: 148.0, protein: 5.0, lipids: 0.4, carbs: 30.0 },
        { name: 'Zanahoria', quantity: '30g', calories: 12.2, protein: 5.0, lipids: 0.4, carbs: 4.3 },
        { name: 'Ajo diente', quantity: '3g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Cebolla', quantity: '5g', calories: 1.9, protein: 0.0, lipids: 0.0, carbs: 0.4 },
        { name: 'Jitomate', quantity: '35g', calories: 5.8, protein: 0.2, lipids: 0.0, carbs: 1.2 },
        { name: 'Chícharos', quantity: '20g', calories: 15.6, protein: 1.0, lipids: 0.0, carbs: 2.8 },
        { name: 'Limón', quantity: '5ml', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Calabaza', quantity: '30g', calories: 6.8, protein: 0.5, lipids: 0.0, carbs: 1.1 },
        { name: 'Granos de elote', quantity: '20g', calories: 18.0, protein: 0.7, lipids: 0.2, carbs: 4.0 },
        { name: 'Aceite de canola', quantity: '5ml', calories: 44.0, protein: 0.0, lipids: 0.0, carbs: 5.0 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-11_xppnon',
        url: 'img-11_xppnon'
      }
    },
    {
      id: '12',
      title: 'Lentejas con arroz, huevo y verduras ralladas',
      preparation: 'Cocer las lentejas en agua con sal. Sofreír el arroz con cebolla y ajo, mezclar con las lentejas. Cocer huevos hasta que queden duros, rebanarlos y agregarlos. Coronar con salsa pico de gallo y rodajas de plátano macho frito. Servir con fruta de temporada.',
      ingredients: [
        { name: 'Lentejas', quantity: '26g', calories: 92.1, protein: 6.7, lipids: 0.3, carbs: 15.6 },
        { name: 'Arroz', quantity: '30g', calories: 108.0, protein: 1.9, lipids: 0.1, carbs: 23.8 },
        { name: 'Cebolla blanca', quantity: '9.2g', calories: 3.6, protein: 0.0, lipids: 0.0, carbs: 0.8 },
        { name: 'Jitomate', quantity: '10g', calories: 1.7, protein: 0.0, lipids: 0.0, carbs: 0.4 },
        { name: 'Huevo', quantity: '30g', calories: 63.0, protein: 5.5, lipids: 4.4, carbs: 0.3 },
        { name: 'Cilantro', quantity: '2g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Naranja agria', quantity: '5ml', calories: 2.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Aceite de canola', quantity: '5ml', calories: 44.0, protein: 0.0, lipids: 5.0, carbs: 0.0 },
        { name: 'Plátano macho', quantity: '15g', calories: 28.5, protein: 0.1, lipids: 0.1, carbs: 3.4 },
        { name: 'Verduras ralladas', quantity: '100g', calories: 25.0, protein: 2.0, lipids: 0.0, carbs: 4.0 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-12_spybjz',
        url: 'img-12_spybjz'
      }
    },
    {
      id: '13',
      title: 'Potaje de frijol bayo con huevo',
      preparation: 'Lavar y desinfectar las verduras. Cocer el frijol bayo con ajo y sal; a medio cocer agregar verduras y epazote. Servir con rodajas de huevo cocido, dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Frijol bayo', quantity: '60g', calories: 248.0, protein: 18.0, lipids: 0.8, carbs: 41.0 },
        { name: 'Huevo cocido', quantity: '15g', calories: 25.0, protein: 1.8, lipids: 1.7, carbs: 0.4 },
        { name: 'Zanahoria', quantity: '30g', calories: 12.2, protein: 0.6, lipids: 0.2, carbs: 4.3 },
        { name: 'Calabaza', quantity: '30g', calories: 5.5, protein: 0.2, lipids: 0.0, carbs: 1.3 },
        { name: 'Jitomate', quantity: '30g', calories: 5.0, protein: 0.2, lipids: 0.1, carbs: 1.3 },
        { name: 'Epazote', quantity: '3g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 1.0, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-13_agydth',
        url: 'img-13_agydth'
      }
    },
    {
      id: '14',
      title: 'Pollo en escabeche con arroz a la jardinera',
      preparation: 'Lavar y desinfectar las verduras. Curtir y limpiar la carne de pollo con limón y sal, dorar junto a cebolla, zanahoria y pimienta; agregar agua y cocinar por 30 minutos. Servir acompañado de arroz a la jardinera, una tortilla y fruta de temporada.',
      ingredients: [
        { name: 'Carne de pollo', quantity: '35g', calories: 42.0, protein: 3.9, lipids: 2.7, carbs: 0.0 },
        { name: 'Cebolla', quantity: '10g', calories: 4.0, protein: 0.1, lipids: 0.1, carbs: 0.8 },
        { name: 'Jitomate', quantity: '20g', calories: 4.0, protein: 0.1, lipids: 0.0, carbs: 0.7 },
        { name: 'Zanahoria', quantity: '25g', calories: 11.0, protein: 0.2, lipids: 0.1, carbs: 1.7 },
        { name: 'Aceite de canola', quantity: '5ml', calories: 44.0, protein: 0.0, lipids: 5.0, carbs: 0.0 },
        { name: 'Arroz', quantity: '20g', calories: 72.0, protein: 1.3, lipids: 0.1, carbs: 27.2 },
        { name: 'Chícharos', quantity: '15g', calories: 13.0, protein: 0.7, lipids: 0.0, carbs: 2.3 },
        { name: 'Tortilla de maíz', quantity: '30g', calories: 64.0, protein: 0.5, lipids: 0.5, carbs: 13.7 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-14_fjm2zk',
        url: 'img-14_fjm2zk'
      }
    },
    {
      id: '15',
      title: 'Tamalitos de pollo molido con salsa de jitomate',
      preparation: 'Preparar la masa mezclando harina de nixtamal con harina integral y sal. Rellenar con pollo molido previamente hervido y salsa de jitomate. Envolver en hojas de plátano lavadas y cocer en vapor por 90 minutos. Servir con fruta de temporada.',
      ingredients: [
        { name: 'Harina de nixtamal', quantity: '36g', calories: 134.0, protein: 2.6, lipids: 1.6, carbs: 27.6 },
        { name: 'Harina integral', quantity: '6.3g', calories: 21.3, protein: 4.5, lipids: 0.1, carbs: 4.5 },
        { name: 'Aceite de canola', quantity: '10ml', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 0.0 },
        { name: 'Pollo', quantity: '20g', calories: 21.0, protein: 0.0, lipids: 0.3, carbs: 0.0 },
        { name: 'Cebolla', quantity: '13.2g', calories: 6.0, protein: 1.3, lipids: 0.0, carbs: 1.3 },
        { name: 'Jitomate', quantity: '28.2g', calories: 5.0, protein: 1.1, lipids: 0.1, carbs: 1.1 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-15_y7r9fx',
        url: 'img-15_y7r9fx'
      }
    },
    {
      id: '16',
      title: 'Frijol con pollo con arroz blanco',
      preparation: 'Cocer el frijol hasta que esté suave y sazonar con sal, epazote y cebolla. Cocer el pollo por separado y agregar al caldo. Preparar arroz dorado en sartén con cebolla y aceite. Servir el caldo con frijol y pollo, acompañado de arroz, una tortilla y fruta de temporada.',
      ingredients: [
        { name: 'Pulpa de pollo', quantity: '55g', calories: 77.0, protein: 10.8, lipids: 3.4, carbs: 0.0 },
        { name: 'Frijol en grano', quantity: '30g', calories: 102.0, protein: 6.5, lipids: 0.4, carbs: 18.6 },
        { name: 'Cebolla blanca', quantity: '11g', calories: 3.8, protein: 0.1, lipids: 0.0, carbs: 1.0 },
        { name: 'Jitomate', quantity: '15g', calories: 2.5, protein: 0.1, lipids: 0.0, carbs: 0.5 },
        { name: 'Epazote', quantity: '1g', calories: 0.0, protein: 0.0, lipids: 0.0, carbs: 0.0 },
        { name: 'Aceite de canola', quantity: '5ml', calories: 44.0, protein: 0.0, lipids: 5.0, carbs: 0.0 },
        { name: 'Arroz', quantity: '20g', calories: 72.0, protein: 1.3, lipids: 0.1, carbs: 15.9 },
        { name: 'Tortilla de maíz', quantity: '30g', calories: 64.0, protein: 1.4, lipids: 0.5, carbs: 13.6 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-16_yntjmx',
        url: 'img-16_yntjmx'
      }
    },
    {
      id: '17',
      title: 'Pollo asado con arroz a la jardinera',
      preparation: 'Lavar y desinfectar las verduras. Asar el pollo en horno y preparar arroz a la jardinera dorando el arroz y mezclándolo con zanahoria y chícharos. Servir con una tortilla y fruta de temporada.',
      ingredients: [
        { name: 'Pollo', quantity: '70g', calories: 84.0, protein: 7.9, lipids: 5.4, carbs: 0.0 },
        { name: 'Arroz', quantity: '40g', calories: 144.0, protein: 2.6, lipids: 0.2, carbs: 31.8 },
        { name: 'Zanahoria', quantity: '35g', calories: 14.2, protein: 0.3, lipids: 0.1, carbs: 2.6 },
        { name: 'Chícharos', quantity: '35g', calories: 40.0, protein: 8.6, lipids: 0.4, carbs: 21.1 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-17_xwrtb2',
        url: 'img-17_xwrtb2'
      }
    },
    {
      id: '18',
      title: 'Picadillo de pollo con frijol y arroz',
      preparation: 'Lavar y desinfectar los ingredientes. Licuar jitomate y cebolla; cocinar la carne molida de pollo con limón, sal y ajo. Añadir zanahoria picada y cocinar; en paralelo, preparar frijol remojado y cocido. Servir el picadillo junto al frijol, con arroz y dos tortillas, acompañado de fruta de temporada.',
      ingredients: [
        { name: 'Carne molida de pollo', quantity: '30g', calories: 111.0, protein: 3.7, lipids: 0.3, carbs: 22.5 },
        { name: 'Jitomate', quantity: '28g', calories: 5.0, protein: 0.2, lipids: 0.0, carbs: 1.1 },
        { name: 'Frijol', quantity: '16g', calories: 6.0, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Cebolla', quantity: '10g', calories: 4.0, protein: 0.1, lipids: 0.1, carbs: 0.8 },
        { name: 'Zanahoria', quantity: '35g', calories: 14.2, protein: 0.3, lipids: 0.1, carbs: 2.6 },
        { name: 'Aceite de canola', quantity: '10ml', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 30.0 },
        { name: 'Arroz', quantity: '23.5g', calories: 30.0, protein: 0.5, lipids: 0.0, carbs: 6.6 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 2.8, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-18_pkhnxn',
        url: 'img-18_pkhnxn'
      }
    },
    {
      id: '19',
      title: 'Sopa de fideos con verduras y pollo',
      preparation: 'Lavar y desinfectar las verduras. Limpiar y lavar el pollo, agregar limón y una pizca de ajo, cocer en una olla con agua. Por separado, cocer los fideos y, cuando el pollo esté casi listo, agregar las verduras. Servir con dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Sopa de fideos', quantity: '30g', calories: 111.0, protein: 3.7, lipids: 0.3, carbs: 22.5 },
        { name: 'Pollo', quantity: '40g', calories: 43.0, protein: 8.6, lipids: 0.6, carbs: 0.0 },
        { name: 'Zanahoria', quantity: '16g', calories: 6.0, protein: 0.1, lipids: 0.0, carbs: 1.2 },
        { name: 'Calabacita', quantity: '55g', calories: 11.0, protein: 0.4, lipids: 0.0, carbs: 2.7 },
        { name: 'Chayote', quantity: '26g', calories: 6.0, protein: 0.1, lipids: 0.1, carbs: 1.3 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 2.8, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '160g', calories: 120.0, protein: 0.0, lipids: 0.0, carbs: 30.0 }
      ],
      menuImage: {
        id: 'img-19_bgdj58',
        url: 'img-19_bgdj58'
      }
    },
    {
      id: '20',
      title: 'Calabacitas rellenas con arroz',
      preparation: 'Lavar y desinfectar la calabaza; cocerla cortada a lo largo durante 10 minutos, retirar semillas y dejar enfriar. Acitronar granos de elote, jitomate y cebolla; hervir arroz con sal y mezclar con las verduras acitronadas. Rellenar las calabazas y servir con dos tortillas y fruta de temporada.',
      ingredients: [
        { name: 'Calabaza', quantity: '80g', calories: 18.0, protein: 1.4, lipids: 0.1, carbs: 2.9 },
        { name: 'Jitomate', quantity: '20g', calories: 3.0, protein: 0.2, lipids: 0.0, carbs: 0.7 },
        { name: 'Cebolla', quantity: '10g', calories: 4.0, protein: 0.2, lipids: 0.0, carbs: 0.9 },
        { name: 'Granos de elote', quantity: '10g', calories: 9.0, protein: 0.3, lipids: 0.1, carbs: 2.0 },
        { name: 'Aceite de canola', quantity: '10g', calories: 88.0, protein: 0.0, lipids: 10.0, carbs: 0.0 },
        { name: 'Arroz', quantity: '40g', calories: 144.0, protein: 2.6, lipids: 0.2, carbs: 31.8 },
        { name: 'Tortilla de maíz', quantity: '60g', calories: 128.0, protein: 2.8, lipids: 1.0, carbs: 27.2 },
        { name: 'Fruta de temporada', quantity: '80g', calories: 60.0, protein: 0.0, lipids: 0.0, carbs: 15.0 }
      ],
      menuImage: {
        id: 'img-20_tlqopz',
        url: 'img-20_tlqopz'
      }
    }
  ]

  for (const menu of dummyMenus) {
    await prisma.menu.create({
      data: {
        title: menu.title,
        preparation: menu.preparation,
        ingredients: {
          create: menu.ingredients
        },
        menuImage: {
          create: {
            url: menu.menuImage.url,
            id: menu.menuImage.id
          }
        }
      }
    })
  }

  // eslint-disable-next-line no-console
  console.log('Dummy menus inserted successfully')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// async function main2() {
//   const weekdays = [
//     // { name: 'monday', order: 1 }
//     // { name: 'tuesday', order: 2 }
//     // { name: 'wednesday', order: 3 }
//     // { name: 'thursday', order: 4 }
//     { name: 'friday', order: 5 }
//   ]

//   for (const weekday of weekdays) {
//     await prisma.weekday.create({
//       data: weekday
//     })
//   }

//   console.log('Weekdays have been added to the database.')
// }

// main2()
//   .catch(e => {
//     console.error(e)
//     process.exit(1)
//   })
