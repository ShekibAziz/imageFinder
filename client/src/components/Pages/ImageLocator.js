import React from 'react'
import { default as SearchImages } from '../Atoms/SearchBar'
import Upload from '../Atoms/Upload'
import ImagesDisplay from '../Molecules/ImagesDisplay'
import imagesApi from '../../api/images'
import styled from 'styled-components'

export default function ImageLocator() {
  const [searchText, setSearchText] = React.useState('')
  const [images, setImages] = React.useState([])
  const [uploadFileList, setUploadFileList] = React.useState([])

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imagesApi.get('/')
        const images = response.data.map((img) => ({
          src: response.config.baseURL + '/' + img,
          title: img,
        }))
        setImages(images)
      } catch (error) {
        console.log({ error })
      }
    }

    fetchImages()
  }, [uploadFileList])

  return (
    <Page>
      <SearchAndUploadContainer>
        <SearchImages
          images={images}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Upload
          uploadFileList={uploadFileList}
          setUploadFileList={setUploadFileList}
        />
      </SearchAndUploadContainer>
      <ImagesDisplay searchText={searchText} images={images} />
    </Page>
  )
}

const Page = styled.div`
  margin: 30px;
`

const SearchAndUploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
