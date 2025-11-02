import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Eliminando días festivos existentes...')
  await prisma.holiday.deleteMany() // borra todo lo que haya
  console.log('Registros eliminados.')

  // Array of holidays for 2025-2026
  const holidays = [
    { name: 'Inicio de ciclo', date: new Date('2025-09-01') },
    // Septiembre 2025
    { name: 'Aniversario de la Independencia de México', date: new Date('2025-09-16') },
    { name: 'Consejo Técnico', date: new Date('2025-09-26') },
    // Octubre 2025
    { name: 'Consejo Técnico', date: new Date('2025-10-31') },
    // Noviembre 2025
    { name: 'Aniversario de la Revolución Mexicana', date: new Date('2025-11-17') },
    { name: 'Consejo Técnico', date: new Date('2025-11-28') },
    // Diciembre 2025 - Vacaciones de Invierno
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-22') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-23') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-24') },
    { name: 'Navidad', date: new Date('2025-12-25') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-26') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-29') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-30') },
    { name: 'Vacaciones de Invierno', date: new Date('2025-12-31') },
    // Enero 2026 - Vacaciones y Consejo Técnico
    { name: 'Año Nuevo', date: new Date('2026-01-01') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-02') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-05') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-06') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-07') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-08') },
    { name: 'Vacaciones de Invierno', date: new Date('2026-01-09') },
    { name: 'Consejo Técnico', date: new Date('2026-01-30') },
    // Febrero 2026
    { name: 'Día de la Constitución', date: new Date('2026-02-02') },
    { name: 'Corso infantil', date: new Date('2026-02-13') },
    { name: 'Carnaval', date: new Date('2026-02-16') },
    { name: 'Carnaval', date: new Date('2026-02-17') },
    { name: 'Consejo Técnico', date: new Date('2026-02-27') },
    // Marzo 2026
    { name: 'Natalicio de Benito Juárez', date: new Date('2026-03-16') },
    { name: 'Consejo Técnico', date: new Date('2026-03-27') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-03-30') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-03-31') },
    // Abril 2026 - Vacaciones de Semana Santa
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-01') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-02') },
    { name: 'Viernes Santo', date: new Date('2026-04-03') },
    { name: 'Sábado de Gloria', date: new Date('2026-04-04') },
    { name: 'Domingo de Resurrección', date: new Date('2026-04-05') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-06') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-07') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-08') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-09') },
    { name: 'Vacaciones de Semana Santa', date: new Date('2026-04-10') },
    // Mayo 2026
    { name: 'Día del Trabajo', date: new Date('2026-05-01') },
    { name: 'Aniversario de la Batalla de Puebla', date: new Date('2026-05-05') },
    { name: 'Día del Maestro', date: new Date('2026-05-15') },
    { name: 'Consejo Técnico', date: new Date('2026-05-29') },
    // Junio 2026
    { name: 'Consejo Técnico', date: new Date('2026-06-26') },
    // Julio 2026
    { name: 'Fin de Curso Escolar', date: new Date('2026-07-15') }
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
