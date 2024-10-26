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

export const SectionContentTerms = () => {
  const [activeSection, setActiveSection] = useState('descripcion')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSections, setFilteredSections] = useState<ISection[]>([])

  const sections = [
    { id: 'descripcion', title: 'Service Description' },
    { id: 'responsabilidad', title: 'User Responsibility' },
    { id: 'limitaciones', title: 'Service Limitations' },
    { id: 'modificaciones', title: '  Modifications' },
    { id: 'ley', title: 'Applicable Law' }
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
    toast.success('Terms and Conditions Accepted', {
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
                    className="w-full justify-start mb-2 text-left text-blue-100 hover:text-white hover:bg-blue-800"
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
                {activeSection === 'descripcion' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">1. Service Description</h2>
                    <p className="text-gray-200">
                      Nuestra plataforma de Newsletters Educativos facilita la distribución de información mensual, incluyendo temas de estudio, vocabulario y enlaces a videos de apoyo. Los maestros administradores pueden subir y gestionar el contenido de manera eficiente, asegurando que los padres tengan acceso inmediato y actualizado desde cualquier dispositivo.
                    </p>
                  </section>
                )}
                {activeSection === 'responsabilidad' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">2. User Responsibility</h2>
                    <p className="text-gray-200">
                      El maestro administrador es responsable de subir contenido preciso y actualizado. Debe asegurarse de que los enlaces a los videos sean válidos y que el vocabulario y los temas reflejen el currículo mensual. Además, debe proteger sus credenciales de acceso para mantener la seguridad de la plataforma.
                    </p>
                  </section>
                )}
                {activeSection === 'limitaciones' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">3. Service Limitations</h2>
                    <p className="text-gray-200">
                      La plataforma está alojada en Vercel utilizando un plan de base de datos gratuito, lo que impone ciertas limitaciones en términos de almacenamiento y rendimiento. Si se superan estos límites, puede haber retrasos en la actualización de los boletines o en la carga de contenido adicional. Se recomienda monitorear el uso y considerar una actualización de plan si es necesario.
                    </p>
                  </section>
                )}
                {activeSection === 'modificaciones' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">4. Modifications</h2>
                    <p className="text-gray-200">
                      Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Se recomienda revisar esta página periódicamente. El uso continuado del servicio después de cualquier modificación constituirá la aceptación de los términos actualizados.
                    </p>
                  </section>
                )}
                {activeSection === 'ley' && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-white">5. Applicable Law</h2>
                    <p className="text-gray-200">
                      Estos términos y condiciones se regirán por las leyes aplicables en Campeche, México, y cualquier disputa será resuelta en sus tribunales competentes.
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
            Accept Terms and Conditions
          </Button>
        </div>
      </div>
    </main>
  )
}
