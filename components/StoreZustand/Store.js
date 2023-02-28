import { create } from 'zustand'

const useFileStore = create((set) => ({
  image: '',
  imageOriginal: '',
  success: '',
  imgObject: '',
  colors: [],
  setColors: (col) =>
    set((state) => ({ colors: state.colors.concat(col.slice(0, 5)) })),
  setImg: (img) => set((state) => ({ image: img })),
  setImgObject: (img) => set((state) => ({ imgObject: img })),
  setSuccess: (acceptedFiles) => set(() => ({ success: acceptedFiles })),
  setLimpiar: set(() => ({ image: '' })),
  setImageOriginal: (urlImageGene) =>
    set(() => ({ imageOriginal: urlImageGene }))
}))

export default useFileStore
