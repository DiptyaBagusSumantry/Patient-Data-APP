import React from 'react'
import { Logo } from '../assets'

export default function Navbar() {
  return (
    <div className='bg-white fixed w-full p-5'>
        <div className='flex items-center justify-center gap-5'>
            <div>
                <img src={Logo} alt="Logo Navbar" className='w-[90px] h-[90px]' />
            </div>
            <div className='text-center'>
                <h1 className='text-2xl font-semibold '>Sinar Akbar Dental Clinic</h1>
                <h1 className='text-lg font-semibold '>Drg. Mega Rafika Baroroh</h1>
                <h1>Jl. Watu Miring RT 3 RW 1, Desa Kepas</h1>
                <h1>Kecamatan Kapas - Kabupaten Bojonegoro</h1>
            </div>
        </div>

    </div>
  )
}
