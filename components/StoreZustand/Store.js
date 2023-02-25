import { create } from 'zustand'

const useFileStore = create(set => ({
  image: '',
  imageGenerated: '',
  success: '',
  colors: [],
  setColors: col =>
    set(state => ({ colors: state.colors.concat(col.slice(0, 5)) })),
  setImg: img => set(state => ({ image: state.image + img })),
  setSuccess: acceptedFiles =>
    set(state => ({ success: state.success + acceptedFiles })),
  setImageGenerated: urlImageGene =>
    set(state => ({ imageGenerated: state.imageGenerated + urlImageGene }))
}))

export default useFileStore
