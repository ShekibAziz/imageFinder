import React from 'react'
import Image from '../Atoms/Image'
import styled from 'styled-components'

export default function ImagesDisplay({ images, searchText }) {
  const numberOfImagesGivenSearchTerm = images.filter((img) => {
    const cleanImageTitle = img?.title?.trim()?.toLowerCase()
    const cleanSearchTerm = searchText?.trim()?.toLowerCase()
    return cleanImageTitle.includes(cleanSearchTerm)
  }).length

  return (
    <Molecule>
      <h2>{numberOfImagesGivenSearchTerm} images</h2>
      <Images>
        {images.map((img) => {
          const cleanSearchTerm = searchText?.trim()?.toLowerCase()
          if (
            cleanSearchTerm === '' ||
            img.title?.toLowerCase().includes(cleanSearchTerm)
          ) {
            return (
              <Image key={img.src} width={'48%'} height={300} src={img.src} />
            )
          }
        })}
      </Images>
    </Molecule>
  )
}

const Molecule = styled.div`
  margin-top: 100px;
`
const Images = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
`
