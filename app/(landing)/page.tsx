import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const LandingPage = () => {
  return (
    <section className='flex justify-between p-4'>
        <div>LandingPage</div>
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