import Image from 'next/image'
import useFileStore from '../components/StoreZustand/Store'
import { redSocial } from './../components/const/constantes'

import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { Cloudinary } from '@cloudinary/url-gen'
import { limitFill } from '@cloudinary/url-gen/actions/resize'
import { IconImg, IconInsta, IconYoutube } from './../components/Icons/icons'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Resultimage() {
  const [loading, setLoading] = useState(true)
  const { imageOriginal, image, setImg, imgObject } = useFileStore()

  const cl = new Cloudinary({
    cloud: {
      cloudName: 'dpbhmwmwm'
    }
  })

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function resizeImg(event, name) {
    event.preventDefault()
    const myImg = cl.image(imgObject.publicId)

    // transformation
    myImg.resize(limitFill().width(1080).height(1920).gravity(autoGravity()))
    // covierto a url
    const nuevaImg = myImg.toURL()

    setImg(nuevaImg)
  }
  function revertImage(event) {
    event.preventDefault()
    setImg(imageOriginal)
  }
  const myLoader = () => {
    setLoading(false)
  }
  console.log(imgObject)
  return (
    <div className='bg-white'>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 lg:hidden'
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                  <div className='flex items-center justify-between px-4'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Filters
                    </h2>
                    <button
                      type='button'
                      className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                    </button>
                  </div>

                  {/* Filters */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pt-10 pb-2'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
              Crop and Resize
            </h1>

            <div className='flex items-center '>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                    Sort
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type='button'
                className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
              >
                <span className='sr-only'>View grid</span>
              </button>
              <button
                type='button'
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='sr-only'>Filters</span>
                <IconImg className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pt-6 pb-10 '>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}

              {/* Product grid */}

              <div className='lg:col-span-3'>
                {/* Replace with your content */}
                {/* /End replace */}
                <div className='flex text-center justify-center p-auto rounded-lg border-4 border-dashed border-gray-200 lg:h-full'>
                  {loading && (
                    <div class='flex items-center'>
                      <div role='status'>
                        <svg
                          aria-hidden='true'
                          class='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                        <span class='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                  <Image
                    src={image}
                    width={300}
                    height={500}
                    onLoadingComplete={myLoader}
                    alt='nose'
                    className='w-auto h-auto rounded-lg aspect-auto py-1'
                  />
                </div>
              </div>

              <ul
                role='list'
                className='flex m-auto flex-wrap gap-2 border-b border-gray-200 p-5 text-sm font-medium text-gray-900'
              >
                <button onClick={revertImage} className='bg-slate-100'>
                  Revertir cambios
                </button>
                {redSocial.map((red) => (
                  <div key={red.id} className='text-center m-auto'>
                    <div className='font-sans text-sm font-semibold p-0'>
                      {red.name}
                    </div>
                    <button
                      onClick={(e) => resizeImg(e, red.name)}
                      className='w-full sm:w-auto bg-slate-200 hover:bg-purple-500  focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5'
                    >
                      <div className='flex flex-col items-center p-0'>
                        {red.icon === 'insta' ? <IconInsta /> : <IconYoutube />}
                      </div>
                    </button>
                    <p className='font-sans text-xs font-light'>
                      {red.descripcion}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <a href={image} download='asda.jpg'>
          descargar
        </a>
      </div>
    </div>
  )
}

export default Resultimage
