import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Array of holidays for 2025
  const holidays = [
    { name: 'Inicio de ciclo', date: new Date('2024-08-26') },
    // Septiembre 2024
    { name: 'Aniversario de la Independencia de México', date: new Date('2024-09-16') },
    { name: 'Consejo Técnico', date: new Date('2024-09-27') },

    // Octubre 2024
    { name: 'Consejo Técnico', date: new Date('2024-10-25') },

    // Noviembre 2024
    { name: 'Aniversario de la Revolución Mexicana', date: new Date('2024-11-18') },
    { name: 'Consejo Técnico', date: new Date('2024-11-29') },

    // Diciembre 2024 - Vacaciones de Invierno
    { name: 'Navidad', date: new Date('2024-12-25') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-19') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-20') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-23') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-24') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-26') },
    { name: 'Vacaciones de Invierno', date: new Date('2024-12-27') },

    // Enero 2025 - Vacaciones y Consejo Técnico
    { name: 'Año Nuevo', date: new Date('2025-01-01') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-01-02') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-01-03') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-01-06') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-01-07') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-01-08') },
    { name: 'Consejo Técnico', date: new Date('2025-01-31') },

    // Febrero 2025
    { name: 'Consejo Técnico', date: new Date('2025-02-27') },
    { name: 'Corso infantil', date: new Date('2025-02-28') },
    { name: 'Consejo Técnico', date: new Date('2025-02-28') }, // Está repetido en la lista original, lo dejo por si acaso

    // Marzo 2025
    { name: 'Carnaval', date: new Date('2025-03-03') },
    { name: 'Carnaval', date: new Date('2025-03-04') },
    { name: 'Natalicio de Benito Juárez', date: new Date('2025-03-21') },
    { name: 'Consejo Técnico', date: new Date('2025-03-28') },

    // Abril 2025 - Vacaciones de Semana Santa
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-14') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-15') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-16') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-17') },
    { name: 'Viernes Santo', date: new Date('2025-04-18') },
    { name: 'Sábado de Gloria', date: new Date('2025-04-19') },
    { name: 'Domingo de Resurrección', date: new Date('2025-04-20') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-21') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-22') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-23') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-24') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2025-04-25') },

    // Mayo 2025
    { name: 'Día del Trabajo', date: new Date('2025-05-01') },
    { name: 'Día de la Madre', date: new Date('2025-05-02') },
    { name: 'Aniversario de la Batalla de Puebla', date: new Date('2025-05-05') },
    { name: 'Día del Maestro', date: new Date('2025-05-15') },
    { name: 'Día del Estudiante', date: new Date('2025-05-16') },
    { name: 'Consejo Técnico', date: new Date('2025-05-30') },

    // Junio 2025
    { name: 'Fin de Curso Escolar', date: new Date('2025-06-27') }

  ]

  // eslint-disable-next-line no-console
  console.log('Iniciando proceso de seed para días festivos...')

  // Crear los registros de días festivos
  for (const holiday of holidays) {
    await prisma.holiday.create({
      data: holiday
    })
    // eslint-disable-next-line no-console
    console.log(`Creado día festivo: ${holiday.date.toISOString().split('T')[0]} - ${holiday.name}`)
  }
  // eslint-disable-next-line no-console
  console.log('Proceso de seed completado exitosamente.')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Error durante el proceso de seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
