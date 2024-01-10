/* eslint-disable eqeqeq */
import { Provider } from 'react-wrap-balancer'

import Portada from './../components/Portada'
import Dropzone from '@/components/Dropzone'
import Head from 'next/head'
import { IconCloudinary } from '../components/Icons/icons'

import useFileStore from './../components/StoreZustand/Store'
import Resul from '@/components/Resul'

export default function Homepage() {
  const { success } = useFileStore()

  return (
    <>
      <Head>
        <title>PerfectFit</title>
      </Head>
      <Provider>
        {success === 'Exito' ? (
          <Resul />
        ) : (
          <>
            <div className='flex h-screen items-center justify-center flex-col pb-1'>
              <section className='md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary mt-96'>
                <Portada />
                <div className='flex justify-around md:block mt-8 md:mt-0 md:flex-1'>
                  <Dropzone className='lg:py-auto lg:px-auto border-2 border-purple-500 border-dashed rounded-xl shadow-xl' />
                </div>
              </section>
              <div className='flex flex-col md:flex-row w-full text-xs justify-around items-center font-semibold'>
                <span>© 2023 PerfectFit.</span>

                <div className=' flex items-center gap-2'>
                  Made whit <IconCloudinary /> by AlejandroD.
                </div>
                <a
                  href='https://github.com/aledx18'
                  target='_blank'
                  rel='noreferrer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    data-name='Layer 1'
                    viewBox='0 0 24 24'
                    width='25'
                    height='40'>
                    <path d='M12 2.247a10 10 0 00-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 00-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 011.538 1.025 2.137 2.137 0 002.912.825 2.104 2.104 0 01.638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 011.025-2.688 3.594 3.594 0 01.1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 015 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 01.1 2.65 3.869 3.869 0 011.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 01.675 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0012 2.247z' />
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}
      </Provider>
    </>
  )
}
