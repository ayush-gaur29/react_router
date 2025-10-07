import React from 'react'

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src= 'blood.png'
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl font-bold md:text-4xl text-red-700">
                          Your single donation is a lifetime of hope.
                      </h2>
                      
                          <ul className='mt-6 list-disc text-red-700'>
  <li className='mb-4'>
    <span className='text-gray-600 block'>
      Quickly search for nearby blood donors and find the help you need in urgent situations.
    </span>
  </li>
  <li className='mb-4'>
    <span className='text-gray-600 block'>
      Register yourself as a donor and contribute to saving lives in your community.
    </span>
  </li>
  <li className='mb-4'>
    <span className='text-gray-600 block'>
      Our platform is simple and easy to use, allowing anyone to connect with donors or recipients instantly.
    </span>
  </li>
  <li className='mb-4'>
    <span className='text-gray-600 block'>
      Get notified when someone nearby needs blood, and respond quickly to make a difference.
    </span>
  </li>
  <li>
    <span className='text-gray-600 block'>
      Join our mission to save lives by making blood donation accessible and hassle-free for everyone.
    </span>
  </li>
</ul>

                  </div>
              </div>
          </div>
      </div>
  );
}