/* eslint-disable eqeqeq */
import Dropzone from '@/components/Dropzone'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import { Provider } from 'react-wrap-balancer'
import Head from 'next/head'
import Image from 'next/image'

import useFileStore from './../components/StoreZustand/Store'

const Homepage = () => {
  const { success, imageGenerated, image } = useFileStore()

  return (
    <>
      <Head>
        <title>PerfectFit</title>
      </Head>
      <Provider>
        <section className='md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary'>
          <div className='md:flex-1 md:mr-20'>
            <h1 className='font-pt-serif text-2xl font-bold py-2 mb-2 md:mb-7 md:text-5xl'>
              <RoughNotationGroup show>
                <RoughNotation
                  type='highlight'
                  show
                  color='#A855F7'
                  animationDelay={900}
                  animationDuration={1200}
                  order='1'
                >
                  Crop
                </RoughNotation>{' '}
                and{' '}
                <RoughNotation
                  type='box'
                  show
                  color='#A855F7'
                  animationDelay={1400}
                  animationDuration={2500}
                  order='2'
                >
                  Resize
                </RoughNotation>{' '}
                Your Images for Social Media
              </RoughNotationGroup>
            </h1>
            <p className='font-pt-serif font-normal text-md md:text-xl md:font-normal'>
              "PerfectFit" is a web application that allows users to crop and
              resize their images to fit perfectly on various social media
              platforms. Users can quickly adjust their images to match the
              specific dimensions required for different social media networks,
              ensuring that their photos always look their best.
            </p>
          </div>
          <div className='flex justify-around md:block mt-8 md:mt-0 md:flex-1'>
            {success === '' || success === 'Uploading' ? (
              <Dropzone className='lg:py-auto lg:px-auto p-10 border-2 border-purple-500 border-dashed rounded-xl cursor-pointer shadow-lg' />
            ) : (
              <div>
                <h4>vieja</h4>
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt=''
                  className='w-64'
                />
                <h4>nueva</h4>

                <Image
                  width={900}
                  height={1808}
                  src={imageGenerated}
                  alt=''
                  className='w-64'
                />
              </div>
            )}
          </div>
        </section>
      </Provider>
    </>
  )
}

export default Homepage
