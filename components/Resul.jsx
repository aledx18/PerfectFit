/* eslint-disable react/jsx-curly-newline */
import Image from 'next/image'
import useFileStore from '../components/StoreZustand/Store'
import {
  InstagramDescrip,
  TwitterDescrip,
  YoutubeDescrip
} from '../components/const/constantes'
import { Fragment, useState } from 'react'
import { Dialog, Transition, Tab, RadioGroup } from '@headlessui/react'

import {
  IconImg,
  IconInsta,
  IconYoutube,
  IconLinked,
  IconTwitter,
  IconDownload
} from './../components/Icons/icons'
import changeImage from './changeImage'

export default function Resul() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState(0)

  const { imageOriginal, image, setImg, imgObject } = useFileStore()

  function HanddleChange(event) {
    const publicId = imgObject.public_id
    const ImageModif = changeImage(event.name, publicId, tab)
    setImg(ImageModif)
  }

  function revertImage(event) {
    event.preventDefault()
    setImg(imageOriginal)
  }

  const myLoader = () => {
    setLoading(false)
  }

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
        {/* Mobile filter dialog */}
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-screen'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pt-6'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 text-center'>
              Crop and Resize
            </h1>
            <div className='flex items-center'>
              <button
                onClick={revertImage}
                className='cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 '
              >
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
                  Reset Image
                </span>
              </button>
              <a
                href={image}
                download='asda.jpg'
                className='cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 '
              >
                <IconDownload />
              </a>
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

          <section aria-labelledby='products-heading' className='pt-6 pb-5 '>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              <div className='lg:col-span-3'>
                <div className='flex text-center relative m-auto justify-center p-auto rounded-lg border-4 border-dashed border-purple-500/75 lg:h-full'>
                  {loading && (
                    <div
                      role='status'
                      className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center'
                    >
                      <div className='flex items-center justify-center w-full h-52 bg-gray-300 rounded sm:w-96 '>
                        <svg
                          className='w-12 h-12 text-gray-400'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 640 512'
                        >
                          <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                        </svg>
                      </div>
                    </div>
                  )}
                  <Image
                    src={image}
                    fill
                    onLoadingComplete={myLoader}
                    alt='img'
                    className='rounded-xl p-2 m-auto'
                  />
                </div>
              </div>

              <div className='w-full max-w-md px-2 sm:px-0 rounded-xl'>
                <Tab.Group onChange={setTab}>
                  <Tab.List className='flex justify-between rounded-sm m-0'>
                    <Tab className='p-2 m-0 hover:bg-orange-50 focus:border-b-2 border-orange-200 outline-none'>
                      <IconInsta />
                    </Tab>
                    <Tab className='p-2 m-0 hover:bg-sky-50 focus:border-b-2 border-sky-200 outline-none'>
                      <IconTwitter />
                    </Tab>
                    <Tab className='p-2 m-0 hover:bg-red-50 focus:border-b-2 border-red-200 outline-none'>
                      <IconYoutube />
                    </Tab>
                    <Tab className='p-2 m-0 hover:bg-blue-100 focus:border-b-2 border-blue-400 outline-none'>
                      <IconLinked />
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className='mt-2'>
                    <Tab.Panel className='rounded-xl bg-orange-100'>
                      <div className='w-full px-4 py-9'>
                        <div className='mx-auto w-full max-w-md'>
                          <RadioGroup onChange={(e) => HanddleChange(e)}>
                            <RadioGroup.Label className='sr-only'>
                              Server size
                            </RadioGroup.Label>
                            <div className='space-y-5'>
                              {InstagramDescrip.map((insta) => (
                                <RadioGroup.Option
                                  key={insta.name}
                                  value={insta}
                                  className={({ active, checked }) =>
                                    `${
                                      active
                                        ? 'ring-2 ring-opacity-60 ring-offset-2 ring-orange-200'
                                        : ''
                                    }
                                    ${
                                      checked
                                        ? 'bg-gradient-to-br to-orange-300 from-pink-300 bg-opacity-75 text-black'
                                        : 'bg-white'
                                    }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className='flex w-full items-center justify-between'>
                                        <div className='flex items-center'>
                                          <div className='text-sm'>
                                            <RadioGroup.Label
                                              as='p'
                                              className={`font-medium  ${
                                                checked
                                                  ? 'text-gray-900'
                                                  : 'text-gray-800'
                                              }`}
                                            >
                                              {insta.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as='span'
                                              className={`inline ${
                                                checked
                                                  ? 'text-gray-800 text-md'
                                                  : 'text-gray-600'
                                              }`}
                                            >
                                              <span>{insta.ram}</span>{' '}
                                              <span aria-hidden='true'>
                                                &middot;
                                              </span>{' '}
                                              <span>{insta.disk}</span>
                                            </RadioGroup.Description>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='rounded-xl bg-sky-50'>
                      <div className='w-full px-4 py-9'>
                        <div className='mx-auto w-full max-w-md'>
                          <RadioGroup onChange={(e) => HanddleChange(e)}>
                            <RadioGroup.Label className='sr-only'>
                              Server size
                            </RadioGroup.Label>
                            <div className='space-y-5'>
                              {TwitterDescrip.map((insta) => (
                                <RadioGroup.Option
                                  key={insta.name}
                                  value={insta}
                                  className={({ active, checked }) =>
                                    `${
                                      active
                                        ? 'ring-2 ring-opacity-60 ring-offset-2 ring-purple-900'
                                        : ''
                                    }
                                    ${
                                      checked
                                        ? 'bg-purple-400 bg-opacity-75 text-white'
                                        : 'bg-white'
                                    }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className='flex w-full items-center justify-between'>
                                        <div className='flex items-center'>
                                          <div className='text-sm'>
                                            <RadioGroup.Label
                                              as='p'
                                              className={`font-medium  ${
                                                checked
                                                  ? 'text-white'
                                                  : 'text-gray-900'
                                              }`}
                                            >
                                              {insta.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as='span'
                                              className={`inline ${
                                                checked
                                                  ? 'text-sky-100'
                                                  : 'text-gray-500'
                                              }`}
                                            >
                                              <span>{insta.ram}</span>{' '}
                                              <span aria-hidden='true'>
                                                &middot;
                                              </span>{' '}
                                              <span>{insta.disk}</span>
                                            </RadioGroup.Description>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='rounded-xl bg-red-100'>
                      <div className='w-full px-4 py-9'>
                        <div className='mx-auto w-full max-w-md'>
                          <RadioGroup onChange={(e) => HanddleChange(e)}>
                            <RadioGroup.Label className='sr-only'>
                              Server size
                            </RadioGroup.Label>
                            <div className='space-y-5'>
                              {YoutubeDescrip.map((insta) => (
                                <RadioGroup.Option
                                  key={insta.name}
                                  value={insta}
                                  className={({ active, checked }) =>
                                    `${
                                      active
                                        ? 'ring-2 ring-opacity-60 ring-offset-2 ring-purple-900'
                                        : ''
                                    }
                                    ${
                                      checked
                                        ? 'bg-purple-400 bg-opacity-75 text-white'
                                        : 'bg-white'
                                    }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                  }
                                >
                                  {({ checked }) => (
                                    <>
                                      <div className='flex w-full items-center justify-between'>
                                        <div className='flex items-center'>
                                          <div className='text-sm'>
                                            <RadioGroup.Label
                                              as='p'
                                              className={`font-medium  ${
                                                checked
                                                  ? 'text-white'
                                                  : 'text-gray-900'
                                              }`}
                                            >
                                              {insta.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                              as='span'
                                              className={`inline ${
                                                checked
                                                  ? 'text-sky-100'
                                                  : 'text-gray-500'
                                              }`}
                                            >
                                              <span>{insta.ram}</span>{' '}
                                              <span aria-hidden='true'>
                                                &middot;
                                              </span>{' '}
                                              <span>{insta.disk}</span>
                                            </RadioGroup.Description>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className='rounded-xl bg-blue-100'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptas iste possimus, quos quasi, magni eveniet optio
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
