import React from 'react'

const OpenHours = () => {
  return (
    <div className="border-8 border-gray-800 p-6 mmd:p-4 mmd:border-2 w-full mx-auto max-w-md xs:max-w-sm  ">
    <h1 className="w-full mx-auto text-3xl  text-center uppercase font-bold mb-8 mmd:text-2xl">
      Open hours
    </h1>
    <div className="flex  justify-between text-center mb-4 w-full">
      <h3 className="font-light text-left">Monday</h3>
      <p className="font-light">11:30 am – 22:00 pm</p>
    </div>
    <div className="flex  justify-between text-center  mb-4 w-full">
      <h3 className="font-light text-left">Tuesday</h3>
      <p className="font-light">11:30 am – 22:00 pm</p>
    </div>
    <div className="flex  justify-between text-center  mb-4 w-full">
      <h3 className="font-light text-left">Wednesday</h3>
      <p className="font-light">11:30 am – 22:00 pm</p>
    </div>
    <div className="flex  justify-between text-center  mb-4 w-full ">
      <h3 className="font-light text-left">Thursday</h3>
      <p className="font-light">11:30 am – 22:00 pm</p>
    </div>
    <div className="flex  justify-between text-center  mb-4 w-full">
      <h3 className="font-light">Friday</h3>
      <p className="font-light">12:30 am – 22:00 pm</p>
    </div>
    <div className="flex  justify-between text-center  mb-4 w-full">
      <h3 className="font-light text-left">Saturday</h3>
      <p className="font-light">11:30 am – 22:00 pm</p>
    </div>
    <div className="flex    mb-3 w-full">
      <h3 className="font-light text-left -pl-4">Sonntag</h3>
      <p className="font-light w-full text-right  ">Closed</p>
    </div>
    <h1 className="font-light w-full text-center">
  
      ** Kitchen closes at 21:00{" "}
    </h1>
  </div>
  )
}

export default OpenHours