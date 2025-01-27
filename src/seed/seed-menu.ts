import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const dummyMenus = [
    {
      id: '1',
      title: 'Calabacitas rellenas con arroz',
      preparation:
      'Cocer el arroz según las instrucciones del paquete. Rellenar las calabacitas con una mezcla de arroz, cebolla, ajo, tomate y especias al gusto. Cocinar a fuego lento hasta que las calabacitas estén tiernas.',
      ingredients: [
        { name: 'Calabacitas', quantity: '200g', calories: 33, protein: 2, lipids: 0.4, carbs: 7 },
        { name: 'Arroz', quantity: '100g', calories: 130, protein: 3, lipids: 0.2, carbs: 28 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 },
        { name: 'Tomate', quantity: '50g', calories: 18, protein: 0.9, lipids: 0.2, carbs: 3.9 }
      ],
      menuImage: {
        id: 'Calabacitas_rellenas_con_arroz_accnri',
        url: 'Calabacitas_rellenas_con_arroz_accnri'
      }
    },
    {
      id: '2',
      title: 'Sopa de fideos con verduras y pollo',
      preparation:
      'En una olla, calentar el caldo de pollo. Añadir las verduras picadas y cocer por unos minutos. Agregar los fideos y el pollo desmenuzado, cocinar hasta que los fideos estén tiernos.',
      ingredients: [
        { name: 'Caldo de pollo', quantity: '250ml', calories: 15, protein: 3, lipids: 0.5, carbs: 0 },
        { name: 'Fideos', quantity: '50g', calories: 180, protein: 6, lipids: 1, carbs: 36 },
        { name: 'Verduras variadas', quantity: '100g', calories: 40, protein: 2, lipids: 0.2, carbs: 8 },
        { name: 'Pollo', quantity: '100g', calories: 165, protein: 31, lipids: 3.6, carbs: 0 }
      ],
      menuImage: {
        id: 'sopa_de_fideos_con_verduras_y_pollo_wsrn28',
        url: 'sopa_de_fideos_con_verduras_y_pollo_wsrn28'
      }
    },
    {
      id: '3',
      title: 'Picadillo de pollo con frijol y arroz',
      preparation:
      'Cocinar el arroz según las instrucciones. En una sartén, cocinar el pollo picado con cebolla y ajo. Agregar los frijoles y el arroz, mezclar bien y calentar hasta que todo esté integrado.',
      ingredients: [
        { name: 'Pollo', quantity: '150g', calories: 165, protein: 31, lipids: 3.6, carbs: 0 },
        { name: 'Frijoles', quantity: '100g', calories: 127, protein: 8, lipids: 0.8, carbs: 23 },
        { name: 'Arroz', quantity: '100g', calories: 130, protein: 3, lipids: 0.2, carbs: 28 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 }
      ],
      menuImage: {
        id: 'picadillo_de_pollo_con_frijol_y_arroz_pmmm6c',
        url: 'picadillo_de_pollo_con_frijol_y_arroz_pmmm6c'
      }
    },
    {
      id: '4',
      title: 'Pollo asado con arroz a la jardinera',
      preparation:
      'Precalentar el horno a 200°C. Colocar el pollo en una bandeja y sazonarlo. Hornear durante 45 minutos o hasta que esté dorado. Cocinar el arroz y mezclar con zanahorias, chícharos y pimientos. Servir el pollo acompañado del arroz.',
      ingredients: [
        { name: 'Pollo', quantity: '200g', calories: 335, protein: 30, lipids: 23, carbs: 0 },
        { name: 'Arroz', quantity: '100g', calories: 130, protein: 3, lipids: 0.2, carbs: 28 },
        { name: 'Zanahorias', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Chícharos', quantity: '50g', calories: 40, protein: 3, lipids: 0.3, carbs: 7 },
        { name: 'Pimientos', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 }
      ],
      menuImage: {
        id: 'pollo_asado_con_arroz_a_la_jardinera_i1in5z',
        url: 'pollo_asado_con_arroz_a_la_jardinera_i1in5z'
      }
    },
    {
      id: '5',
      title: 'Tamalitos de pollo molido',
      preparation:
      'Cocer el pollo y desmenuzarlo. Mezclar con masa de maíz, caldo, cebolla, ajo y especias al gusto. Formar los tamales y cocer al vapor durante 1 hora.',
      ingredients: [
        { name: 'Pollo molido', quantity: '150g', calories: 180, protein: 33, lipids: 4, carbs: 0 },
        { name: 'Masa de maíz', quantity: '100g', calories: 120, protein: 2, lipids: 1, carbs: 24 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 }
      ],
      menuImage: {
        id: 'tamalitos_de_pollo_molido_mkjfvu',
        url: 'tamalitos_de_pollo_molido_mkjfvu'
      }
    },
    {
      id: '6',
      title: 'Frijol con pollo y arroz',
      preparation:
      'Cocer el arroz según las instrucciones. En una olla, hervir los frijoles y luego añadir el pollo desmenuzado. Servir junto al arroz.',
      ingredients: [
        { name: 'Frijoles', quantity: '100g', calories: 127, protein: 8, lipids: 0.8, carbs: 23 },
        { name: 'Pollo', quantity: '150g', calories: 165, protein: 31, lipids: 3.6, carbs: 0 },
        { name: 'Arroz', quantity: '100g', calories: 130, protein: 3, lipids: 0.2, carbs: 28 }
      ],
      menuImage: {
        id: 'frijol_con_pollo_y_arroz_ddtw70',
        url: 'frijol_con_pollo_y_arroz_ddtw70'
      }
    },
    {
      id: '7',
      title: 'Pollo en escabeche',
      preparation:
      'Cocer el pollo hasta que esté bien cocido. En una sartén, freír cebolla, ajo, zanahorias y pimientos. Agregar vinagre y especias. Servir el pollo con la mezcla de verduras.',
      ingredients: [
        { name: 'Pollo', quantity: '200g', calories: 335, protein: 30, lipids: 23, carbs: 0 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 },
        { name: 'Zanahorias', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Vinagre', quantity: '30ml', calories: 5, protein: 0, lipids: 0, carbs: 1.2 }
      ],
      menuImage: {
        id: 'pollo_en_escabeche_servido_en_plato_wlyuxe',
        url: 'pollo_en_escabeche_servido_en_plato_wlyuxe'
      }
    },
    {
      id: '8',
      title: 'Potaje de frijol bayo',
      preparation:
      'Cocer los frijoles hasta que estén tiernos. En una sartén, freír cebolla, ajo, pimiento y tomate. Agregar a los frijoles y dejar cocer a fuego lento.',
      ingredients: [
        { name: 'Frijoles bayo', quantity: '100g', calories: 120, protein: 8, lipids: 0.6, carbs: 22 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 },
        { name: 'Pimiento', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Tomate', quantity: '100g', calories: 18, protein: 0.9, lipids: 0.2, carbs: 3.9 }
      ],
      menuImage: {
        id: 'potaje_de_frijol_bayo_comida_tjlfrn',
        url: 'potaje_de_frijol_bayo_comida_tjlfrn'
      }
    },
    {
      id: '9',
      title: 'Lentejas con arroz y verduras ralladas',
      preparation:
      'Cocer las lentejas y el arroz por separado. Mezclar con las verduras ralladas y servir todo junto.',
      ingredients: [
        { name: 'Lentejas', quantity: '100g', calories: 116, protein: 9, lipids: 0.4, carbs: 20 },
        { name: 'Arroz', quantity: '100g', calories: 130, protein: 3, lipids: 0.2, carbs: 28 },
        { name: 'Verduras ralladas', quantity: '50g', calories: 25, protein: 1, lipids: 0.5, carbs: 5 }
      ],
      menuImage: {
        id: 'lentejas_con_arroz_verduras_ralladas_vf0b58',
        url: 'lentejas_con_arroz_verduras_ralladas_vf0b58'
      }
    },
    {
      id: '10',
      title: 'Pasta seca con verduras',
      preparation:
      'Cocer la pasta según las instrucciones. En una sartén, saltear las verduras y mezclar con la pasta cocida. Servir caliente.',
      ingredients: [
        { name: 'Pasta seca', quantity: '100g', calories: 350, protein: 7, lipids: 1.5, carbs: 70 },
        { name: 'Verduras variadas', quantity: '100g', calories: 40, protein: 2, lipids: 0.2, carbs: 8 }
      ],
      menuImage: {
        id: 'pasta_seca_con_verduras_ij3uot',
        url: 'pasta_seca_con_verduras_ij3uot'
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
