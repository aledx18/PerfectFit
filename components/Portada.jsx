import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'

function Portada() {
  return (
    <div className='md:flex-1 md:mr-20 lg:mt-0 md:mt-0 mt-96'>
      <RoughNotationGroup show>
        <h1 className='font-pt-serif text-2xl font-bold py-2 mb-2 md:mb-7 md:text-5xl'>
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
            animationDuration={1700}
            order='2'
          >
            Resize
          </RoughNotation>{' '}
          Your Images for Social Media
        </h1>
        <p className='font-pt-serif font-normal text-md md:text-xl md:font-normal'>
          "PerfectFit" is a web application that allows users to crop and resize
          their images to fit perfectly on various social media platforms. Users
          can quickly adjust their images to match the specific dimensions
          required for{' '}
          <RoughNotation
            type='underline'
            order='2'
            color='#A855F7'
            strokeWidth='3px'
          >
            different social media
          </RoughNotation>{' '}
        </p>
      </RoughNotationGroup>
    </div>
  )
}

export default Portada
