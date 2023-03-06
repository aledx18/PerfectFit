/* eslint-disable import/no-duplicates */
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { imagenExample } from './const/constantes'
import upload from './upload'
import useFileStore from './StoreZustand/Store'
import {
  IconImg,
  IconUpload,
  IconX,
  IconButton
} from '../components/Icons/icons'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const { setSuccess, setImageOriginal, setImg, success, setImgObject } =
    useFileStore()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
    if (rejectedFiles?.length) {
      setRejected([...rejectedFiles])
    }
  }, [])

  const { getRootProps, isDragActive, getInputProps, open } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop,
    noClick: true
  })

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  function removeFile(name) {
    setFiles((files) => files.filter((file) => file.name !== name))
  }
  function removeRejected(name) {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }
  function imagenPrev(img) {
    setImgObject(img)
    setImg(img.src)
    setImageOriginal(img.src)
    setSuccess('Exito')
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (!files?.length) return
    setSuccess('Uploading')
    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))
    formData.append('upload_preset', 'ml_dertsxgt')
    formData.append('timestamp', Date.now() / 1000)
    formData.append('api_key', process.env.NEXT_PUBLIC_ApiKey)

    const res = await upload({ formData })
    setImageOriginal(res.secure_url)
    setImgObject(res)
    setImg(res.secure_url)
    setSuccess('Exito')
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit} action=''>
        <div
          {...getRootProps({
            className
          })}
        >
          <input {...getInputProps()} />
          <div className='flex flex-col items-center justify-center p-11'>
            {isDragActive ? (
              <>
                <IconUpload />
                <p className='font-sans font-semibold p-4'>
                  Drop the file here...
                </p>
              </>
            ) : files.length ? (
              <>
                {files.map((file) => (
                  <div key={file.name} className='m-0 p-0'>
                    <button
                      key={file.name}
                      type='button'
                      className='flex hover:blur-sm flex-col transition-colors text-gray-black shadow-sm focus:outline-none font-medium rounded-lg text-sm '
                      onClick={() => removeFile(file.name)}
                    >
                      <IconX />
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={100}
                        height={100}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview)
                        }}
                        className='rounded-md hover:bg-black/10'
                      />
                      <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                        {file.name}
                      </p>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <>
                <IconImg />
                <p className='font-sans font-semibold'>
                  Drag & drop Image here, or
                </p>
                <button
                  onClick={open}
                  className='bg-purple-100 font-sans font-semibold rounded-md p-1'
                >
                  Click here
                </button>
              </>
            )}
          </div>
        </div>

        <div className='items-end'>
          <div>
            {rejected.length ? (
              <div>
                <h3 className='mt-4 title text-md font-sans font-semibold text-neutral-600 border-b'>
                  Rejected File
                </h3>
                <ul className='flex flex-col bg-slate-50 rounded-md'>
                  {rejected.map(({ file, errors }) => (
                    <li
                      key={file.name}
                      className='flex justify-between items-center'
                    >
                      <div>
                        <p className='text-neutral-500 text-sm font-medium'>
                          {file.name}
                        </p>
                        <ul className='text-[12px] text-red-400'>
                          {errors.map((error) => (
                            <li key={error.code}>{error.message}</li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type='button'
                        className='text-gray-black border-2 border-purple-400 border-solid hover:bg-gray-200 focus:outline-none font-normal rounded-lg text-sm'
                        onClick={() => removeRejected(file.name)}
                      >
                        <IconX />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-row content-center justify-between items-center border-b pb-2 pt-2'>
          <h3 className=' title text-md font-sans font-semibold text-neutral-600'>
            Example Fiels
          </h3>
          <div>
            {files.length ? (
              success === 'Uploading' ? (
                <IconButton />
              ) : (
                <button
                  type='submit'
                  className='text-gray-black border-2 border-purple-600 border-solid hover:text-gray-50 hover:bg-purple-900/50 focus:outline-none font-medium rounded-lg text-sm px-6 py-2'
                >
                  Upload
                </button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </form>
      <div className=' pt-1 flex md:flex-wrap md:flex-row md:items-center gap-2 flex-col'>
        {imagenExample.map((img) => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.alt}
            width={100}
            height={100}
            loading='lazy'
            onClick={() => {
              imagenPrev(img)
            }}
            className='rounded-md shadow-md filter grayscale hover:grayscale-0 w-auto h-auto cursor-pointer hover:rounded-md hover:scale-105'
          />
        ))}
      </div>
    </div>
  )
}

export default Dropzone
