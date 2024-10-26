'use client'

import { Printer } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ISection {
  id: string
  title: string
}

export const SectionContentPrivacy = () => {
  const [activeSection, setActiveSection] = useState('contenido')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSections, setFilteredSections] = useState<ISection[]>([])

  const sections = [
    { id: 'contenido', title: 'Educational Content' },
    { id: 'almacenamiento', title: 'Data Storage' },
    { id: 'seguridad', title: 'Data Security' },
    { id: 'cambios', title: 'Changes to This Policy' }
  ]

  useEffect(() => {
    setFilteredSections(
      sections.filter(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm])

  const handlePrint = () => {
    window.print()
  }

  const handleAccept = () => {
    toast.success('Privacy Policy Accepted', {
      position: 'top-right',
      duration: 2000
    })
  }

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-6">
        <nav className="w-full md:w-64 flex-shrink-0 print:hidden">
          <Card className="bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl">
            <CardContent className="p-4">
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value) }}
                  className="border-blue-600"
                />
              </div>
              <ScrollArea className="h-[calc(50vh-200px)]">
                {filteredSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? 'primary' : 'ghost'}
                    className="w-full justify-start mb-2 text-left text-white hover:text-white hover:bg-blue-800"
                    onClick={() => { setActiveSection(section.id) }}
                  >
                    {section.title}
                  </Button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </nav>
        <div className="flex-grow">
          <Card className="bg-gray-800 bg-opacity-50">
            <CardContent className="p-6">
              <ScrollArea className="h-[calc(50vh-200px)]">
                {activeSection === 'contenido' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">1. Educational Content</h2>
                    <p className="text-gray-200">
                      Esta plataforma se utiliza para compartir contenido educativo (newsletters) que contienen temas, vocabulario y enlaces a videos relacionados con las clases de inglés. No se recopilan datos personales de los usuarios finales (padres o estudiantes) a través de esta plataforma.
                    </p>
                  </section>
                )}
                {activeSection === 'almacenamiento' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">2. Data Storage</h2>
                    <p className="text-gray-200">
                      El contenido subido por el maestro administrador (newsletters) se almacena en una base de datos proporcionada por Vercel en un plan gratuito. Esta base de datos garantiza que la información educativa esté disponible de manera segura y accesible en todo momento.
                    </p>
                  </section>
                )}
                {activeSection === 'seguridad' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">3. Data Security</h2>
                    <p className="text-gray-200">
                      Implementamos medidas de seguridad para proteger el contenido educativo almacenado contra accesos no autorizados. Aunque no se manejan datos personales sensibles, aseguramos que todo el contenido esté resguardado siguiendo las prácticas estándar de seguridad.
                    </p>
                  </section>
                )}
                {activeSection === 'cambios' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">6. Changes to This Policy</h2>
                    <p className="text-gray-200">
                      Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio se publicará en la plataforma y será visible para el administrador. Si hay cambios sustanciales, el maestro administrador será notificado.
                    </p>
                  </section>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex flex-col w-full min-[440px]:flex-row gap-4 justify-between items-center print:hidden">
        <p className="text-sm text-white">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="flex gap-2 items-center">
          <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Printer className="h-4 w-4" />
            <span className='hidden sm:block ml-2'>Print</span>
          </Button>
          <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700 text-white">
            Accept Privacy Policy
          </Button>
        </div>
      </div>
    </main>
  )
}
