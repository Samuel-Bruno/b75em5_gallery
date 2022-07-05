import React from 'react'
import * as S from './styled'
import { Photo } from '../../types/photo'

type PropsType = {
  data: Photo;
  handleDeleteFn: (data: Photo, key: number) => Promise<void>;
  k: number;
}

const PhotoItem = ({ data, handleDeleteFn, k }: PropsType) => {



  return (
    <S.Container key={k}>
      <img src={data.url} alt='' />
      <span>{data.name}</span>
      <S.DeleteArea onClick={() => handleDeleteFn(data, k)}>
        <span>Excluir foto</span>
      </S.DeleteArea>
    </S.Container>
  )

}


export default PhotoItem