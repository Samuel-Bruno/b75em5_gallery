import React, { FormEvent, useEffect, useState } from 'react';
import * as C from './App.styles'
import PhotoItem from './components/PhotoItem';
import * as Photos from './services/photos'
import { Photo } from './types/photo';


const App = () => {

  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true)
      setPhotos(await Photos.getAll())
      setLoading(false)
    }
    getPhotos()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if (file && file.size > 0) {
      setUploading(true)
      let res = await Photos.insert(file)

      if (res instanceof Error) {
        alert(`${res.name} - ${res.message}`)
      } else {
        let newPhotoList = [...photos, res]
        setPhotos(newPhotoList)
      }
      setUploading(false)
    }
  }

  const handleDelete = async (data: Photo, key: number) => {
    await Photos.deletePhoto(data)
    console.log(`key = ${key}`)
    let filteredArray = photos.filter((photo, k) => k !== key)
    setPhotos(filteredArray)
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        <C.UploadForm method="POST" onSubmit={handleSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && <span>Enviando...</span>}
        </C.UploadForm>

        {loading &&
          <C.ScreenWarning>
            <div className="emoji">🤚</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }
        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>Não há fotos salvas</div>
          </C.ScreenWarning>
        }
        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((photo, k) => <PhotoItem
              data={photo}
              k={k}
              handleDeleteFn={handleDelete}
            />)}
          </C.PhotoList>
        }
      </C.Area>
    </C.Container>
  )

}

export default App