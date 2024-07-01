import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl '>
      <div className="flex-1 justify-center flex flex-col text-center">
        <h2 className='text-2xl'>You Envision, We Create!</h2>
        <p className='text-gray-500 my-2'>Check out the recent resources with successfull completion of projects</p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
          <a href="https://fastdev.site/" target='_blank'>
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 flex justify-center items-center">
        <img src="https://media.licdn.com/dms/image/D4D0BAQGKuxrjMOmbqw/company-logo_200_200/0/1690304041371?e=2147483647&v=beta&t=gbl0nExZrkXwrR3F15V1pxOZ8WKnW4eMqATtf4etnvY" />
      </div>
    </div>
  )
}
