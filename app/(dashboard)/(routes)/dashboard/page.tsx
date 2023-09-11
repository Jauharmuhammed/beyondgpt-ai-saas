import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardPage = () => {
  return (
    <section className=' flex justify-between p-4'>
        <div>DashboardPage</div>
        <UserButton afterSignOutUrl="/"/>
    </section>
  )
}

export default DashboardPage