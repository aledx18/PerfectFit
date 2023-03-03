import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import {
  sizeInsta,
  sizeTwitter,
  sizeYoutube,
  sizeLinkedin
} from '../components/const/constantes'

function changeImage(name, publicId, tab) {
  const cl = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CloudName
    }
  })
  const myImg = cl.image(publicId)

  if (tab === 0) {
    const sizeChoice = sizeInsta[name]
    myImg.resize(
      fill().width(sizeChoice.w).height(sizeChoice.h).gravity(autoGravity())
    )
    const imageChange = myImg.toURL()
    return imageChange
  }
  if (tab === 1) {
    const sizeChoiceT = sizeTwitter[name]
    myImg.resize(
      fill().width(sizeChoiceT.w).height(sizeChoiceT.h).gravity(autoGravity())
    )
    return myImg.toURL()
  }
  if (tab === 2) {
    const sizeChoiceY = sizeYoutube[name]
    myImg.resize(
      fill().width(sizeChoiceY.w).height(sizeChoiceY.h).gravity(autoGravity())
    )
    return myImg.toURL()
  }
  if (tab === 3) {
    const sizeChoiceL = sizeLinkedin[name]
    myImg.resize(
      fill().width(sizeChoiceL.w).height(sizeChoiceL.h).gravity(autoGravity())
    )
    return myImg.toURL()
  }
}

export default changeImage
