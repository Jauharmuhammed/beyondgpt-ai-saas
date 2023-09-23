import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Comfortaa } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const comfortaa = Comfortaa({ weight: ["700"], subsets: ["greek"] });

const LandingPage = () => {
  return (
    <section className='flex justify-between p-4'>
        <div>
        <div className="mb-20">
                <Link className="flex space-x-3 items-center" href={"/dashboard"}>
                    <Image
                        className="ms-2 w-auto"
                        width={30}
                        height={30}
                        alt="Logo"
                        src={"/logo.png"}
                        priority></Image>
                    <h1 className={cn(" text-4xl mt-2", comfortaa.className)}>Ginie</h1>
                </Link>
            </div>
        </div>
        <div className='flex gap-3'>
            <Link href='/sign-in'>
             <Button>
                Login
             </Button>
            </Link>
            <Link href='/sign-up'>
             <Button>
                Register
             </Button>
            </Link>
        </div>
    </section>
  )
}

export default LandingPage