import Image from 'next/image'
import upload from './upload'
import useFileStore from './StoreZustand/Store'
import { IconUpload } from '../components/Icons/icons'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ className }) => {
  const { setSuccess, setImageGenerated, setImg, setColors } = useFileStore()
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

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

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop
  })

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!files?.length) return

    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))
    formData.append('upload_preset', 'ml_dertsxgt')
    formData.append('timestamp', Date.now() / 1000)
    formData.append('api_key', 253679461765826)

    const res = await upload({ formData })
    setSuccess('Uploading')

    setImageGenerated(res.nuevaImg)
    setImg(res.viejaImg)
    setColors(res.five)
    setSuccess('Exito')
  }

  return (
    <form onSubmit={handleSubmit} action=''>
      <div
        {...getRootProps({
          className
        })}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          {isDragActive ? (
            <p>Drop the files here ...</p>
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
              <IconUpload />
              <p className='font-sans font-semibold'>Drag & drop files here</p>
            </>
          )}
        </div>
      </div>

      <div className='flex justify-around items-center'>
        <div>
          {rejected.length ? (
            <div>
              <h3 className='mt-4 title text-md font-sans font-semibold text-neutral-600 border-b pb-2'>
                Rejected Files
              </h3>
              <ul className='mt-6 flex flex-col'>
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
                      className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                      onClick={() => removeRejected(file.name)}
                    >
                      remove
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

      <div className='flex flex-row content-center justify-between items-center border-b pb-2'>
        <h3 className='mt-2 title text-md font-sans font-semibold text-neutral-600'>
          Example Fiels
        </h3>
        <div>
          {files.length ? (
            <button
              type='submit'
              className='mt-2 text-gray-black border-2 border-purple-600 border-solid hover:text-gray-50 hover:bg-black/75 focus:outline-none font-medium rounded-lg text-sm px-4 py-2'
            >
              Upload to Cloudinary
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='flex justify-around pt-1'>
        <Image
          src='/pepe.jpg'
          alt='pepeimg'
          width={100}
          height={100}
          className='rounded-sm shadow-md'
        />
        <Image
          src='/pepa.jpg'
          alt='pepeimg'
          width={100}
          height={100}
          className='rounded-sm shadow-md'
        />
        <Image
          src='/exam.png'
          alt='pepeimg'
          width={100}
          height={100}
          className='rounded-sm shadow-md'
        />
      </div>
    </form>
  )
}

export default Dropzone
