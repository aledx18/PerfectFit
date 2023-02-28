import axios from 'axios'
import { Cloudinary } from '@cloudinary/url-gen'

export default async function upload({ formData }) {
  const cl = new Cloudinary({
    cloud: {
      cloudName: 'dpbhmwmwm'
    }
  })

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dpbhmwmwm/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    const viejaImg = response.data.secure_url

    const myImg = cl.image(response.data.public_id)
    // transformation

    // covierto a url
    const nuevaImg = myImg.toURL()
    const five = response.data.colors.slice(0, 5)

    return { viejaImg, five, nuevaImg }
  } catch (error) {
    console.error(error)
  }
}
