import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //logica en js
const name = 'Juan'

  return (
    //html

    <main className='h-screen w-screen bg-gray-500'>
      <h1 className='text-4xl text-center text-white'>Hola {name}</h1>
      <Link href="demo" className='text-4xl text-center text-white'>
      Demo
      </Link>
     
    </main>
  )
}
