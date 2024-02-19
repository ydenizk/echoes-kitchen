import React from 'react'
import NewsletterClient from './newsletterClient'

const Newsletter = () => {
  return (

<div>
  <p className='text-stone-200 py-2 font-light' >Subscibe to newsletter.</p>
    <NewsletterClient />
</div>
  )
}

export default Newsletter