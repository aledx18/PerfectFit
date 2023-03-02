import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { size } from '../components/const/constantes'

function changeImage(name, publicId, tab) {
  const cl = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CloudName
    }
  })
  const myImg = cl.image(publicId)

  const sizeChoice = size[name]

  if (tab === 0) {
    myImg.resize(
      fill().width(sizeChoice.w).height(sizeChoice.h).gravity(autoGravity())
    )
    return myImg.toURL()
  }
}

export default changeImage
