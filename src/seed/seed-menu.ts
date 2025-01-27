import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const dummyMenus = [
    {
      id: '1',
      title: 'Pasta con albóndigas',
      preparation:
        'Cocer la pasta según las instrucciones del paquete. Calentar las albóndigas en una sartén con la salsa de tomate. Escurrir la pasta, mezclar con las albóndigas y la salsa. Servir caliente.',
      ingredients: [
        { name: 'Pasta integral', quantity: '80g', calories: 280, protein: 10, lipids: 1.5, carbs: 56 },
        { name: 'Albóndigas de ternera', quantity: '100g', calories: 250, protein: 20, lipids: 18, carbs: 2 },
        { name: 'Salsa de tomate', quantity: '50g', calories: 30, protein: 1, lipids: 0.2, carbs: 6 }
      ],
      menuImage: {
        id: 'pasta_with_meatballs_hxlcrn',
        url: 'pasta_with_meatballs_hxlcrn'
      }
    },
    {
      id: '2',
      title: 'Pollo al horno',
      preparation:
        'Precalentar el horno a 200°C. Colocar el pollo, las patatas, zanahorias, cebolla y ajo en una bandeja. Espolvorear con romero, sal y pimienta. Hornear durante 45-50 minutos o hasta que el pollo esté dorado y las verduras tiernas.',
      ingredients: [
        { name: 'Pollo', quantity: '200g', calories: 335, protein: 30, lipids: 23, carbs: 0 },
        { name: 'Patatas', quantity: '150g', calories: 110, protein: 2, lipids: 0.2, carbs: 26 },
        { name: 'Zanahorias', quantity: '100g', calories: 41, protein: 0.9, lipids: 0.2, carbs: 10 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 }
      ],
      menuImage: {
        id: 'Pollo_al_horno_ygwnm4',
        url: 'Pollo_al_horno_ygwnm4'
      }
    },
    {
      id: '3',
      title: 'Pescado con arroz',
      description: 'Filete de merluza, arroz integral, guisantes, limón.',
      preparation:
        'Cocer el arroz integral según las instrucciones del paquete. En una sartén, cocinar el filete de merluza con un poco de aceite. Añadir guisantes y un chorrito de limón. Servir el pescado acompañado del arroz.',
      ingredients: [
        { name: 'Filete de merluza', quantity: '150g', calories: 90, protein: 19, lipids: 1.5, carbs: 0 },
        { name: 'Arroz integral', quantity: '100g', calories: 370, protein: 8, lipids: 3, carbs: 76 },
        { name: 'Guisantes', quantity: '50g', calories: 40, protein: 3, lipids: 0.3, carbs: 7 },
        { name: 'Limón', quantity: '1 unidad', calories: 17, protein: 0.6, lipids: 0.2, carbs: 5.4 }
      ],
      menuImage: {
        id: 'Pescado_con_arroz_ant2yd',
        url: 'Pescado_con_arroz_ant2yd'
      }
    },
    {
      id: '4',
      title: 'Lentejas estofadas',
      description: 'Lentejas, zanahoria, cebolla, ajo, pimiento, tomate.',
      preparation:
        'En una olla, sofreír cebolla, ajo y pimiento. Añadir zanahoria y tomate picado. Incorporar las lentejas y agua suficiente. Cocer a fuego lento hasta que las lentejas estén tiernas.',
      ingredients: [
        { name: 'Lentejas', quantity: '100g', calories: 116, protein: 9, lipids: 0.4, carbs: 20 },
        { name: 'Zanahoria', quantity: '80g', calories: 33, protein: 0.7, lipids: 0.1, carbs: 8 },
        { name: 'Cebolla', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Ajo', quantity: '5g', calories: 7, protein: 0.3, lipids: 0, carbs: 1 },
        { name: 'Pimiento', quantity: '50g', calories: 20, protein: 0.5, lipids: 0, carbs: 4.6 },
        { name: 'Tomate', quantity: '100g', calories: 18, protein: 0.9, lipids: 0.2, carbs: 3.9 }
      ],
      menuImage: {
        id: 'Lentejas_estofadas_qho1po',
        url: 'Lentejas_estofadas_qho1po'
      }
    },
    {
      id: '5',
      title: 'Pizza casera',
      preparation:
        'Extender la masa integral sobre una bandeja. Añadir salsa de tomate, mozzarella y las verduras troceadas. Hornear a 220°C durante 15-20 minutos o hasta que esté dorada.',
      ingredients: [
        { name: 'Masa integral', quantity: '150g', calories: 320, protein: 9, lipids: 6, carbs: 60 },
        { name: 'Tomate', quantity: '50g', calories: 18, protein: 0.9, lipids: 0.2, carbs: 3.9 },
        { name: 'Mozzarella', quantity: '100g', calories: 280, protein: 28, lipids: 17, carbs: 2 },
        { name: 'Verduras variadas', quantity: '100g', calories: 40, protein: 2, lipids: 0.2, carbs: 8 }
      ],
      menuImage: {
        id: 'Pizza_casera_rall0l',
        url: 'Pizza_casera_rall0l'
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
  .finally(async () => {
    await prisma.$disconnect()
  })

// async function main2() {
//   const weekdays = [
//     // { name: 'monday', order: 1 },
//     // { name: 'tuesday', order: 2 },
//     // { name: 'wednesday', order: 3 },
//     // { name: 'thursday', order: 4 },
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
