import { Photo } from "../types/photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { v4 as createId } from "uuid";


export const getAll = async () => {
  let list: Photo[] = []

  const imagesFolder = ref(storage, "images") // storage (fb_storage como um todo) | "images" (pasta no storage)
  const photoList = await listAll(imagesFolder)

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i])

    list.push({
      name: photoList.items[i].name,
      url: photoUrl
    })
  }

  return list;
}

export const insert = async (file: File) => {
  if (['image/jpg', 'image/jpeg', 'image.png'].includes(file.type)) {
    let hashName = ref(storage, `images/${createId()}`)

    let upload = await uploadBytes(hashName, file)
    let photoUrl = await getDownloadURL(upload.ref)

    return { name: upload.ref.name, url: photoUrl } as Photo
  } else {
    return new Error('Tipo de arquivo não permitido')
  }
}

export const deletePhoto = async (file: Photo) => {
  let photoRef = ref(storage, `images/${file.name}`)
  await deleteObject(photoRef)
}