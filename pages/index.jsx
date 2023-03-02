/* eslint-disable eqeqeq */
import { Provider } from 'react-wrap-balancer'

import Portada from './../components/Portada'
import Dropzone from '@/components/Dropzone'
import Head from 'next/head'
import { IconCloudinary } from '../components/Icons/icons'

import useFileStore from './../components/StoreZustand/Store'
import ResultImage from 'components/ResultImage'

const Homepage = () => {
  const { success } = useFileStore()

  return (
    <>
      <Head>
        <title>PerfectFit</title>
      </Head>
      <Provider>
        {success === 'Exito' ? (
          <ResultImage />
        ) : (
          <>
            <div className='flex h-screen items-center justify-center flex-col pb-4'>
              <section className='md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary'>
                <Portada />
                <div className='flex justify-around md:block mt-8 md:mt-0 md:flex-1'>
                  <Dropzone className='lg:py-auto lg:px-auto border-2 border-purple-500 border-dashed rounded-xl shadow-xl' />
                </div>
              </section>
              <IconCloudinary />
            </div>
          </>
        )}
      </Provider>
    </>
  )
}

export default Homepage
