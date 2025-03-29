'use server'

import prisma from '@/lib/prisma'

export async function getSchoolCycleDates() {
  try {
    // Get school cycle dates from the database
    const startCycle = await prisma.holiday.findFirst({
      where: { name: 'Inicio de ciclo' }
    })

    const endCycle = await prisma.holiday.findFirst({
      where: { name: 'Fin de ciclo' }
    })

    if (!startCycle || !endCycle) {
      return { ok: false, message: 'The school cycle dates are not configured' }
    }

    return {
      ok: true,
      startDate: startCycle.date,
      endDate: endCycle.date
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching school cycle dates:', error)
    return { ok: false, message: 'Internal server error' }
  }
}
