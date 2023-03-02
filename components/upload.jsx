import axios from 'axios'

export default async function upload({ formData }) {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const myImg = response.data

    return myImg
  } catch (error) {
    console.error(error)
  }
}
