import Image from 'next/image'
import Link from 'next/link'
import { ButtonBack } from '../button-back/ButtonBack'
import { titleFont } from '@/config/fonts'

export const PageNotFound = () => {
  return (
    <div className=" flex flex-col md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light mt-2">
          <span>Puedes regresar al </span>
          <Link href="/" className='font-normal hover:underline transition-all'>inicio </Link>
        </p>
        <p className='mt-2'>o</p>
        <ButtonBack className='' name='ir a atrás en tu navegador.' />
      </div>
      <div className="px-5 mx-5">
        <Image src="/imgs/starman_750x750.png" width={550} height={550} alt="Starman" />
      </div>
    </div>
  )
}
