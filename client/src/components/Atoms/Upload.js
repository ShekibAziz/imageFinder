import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

export default function CustomUpload({ uploadFileList, setUploadFileList }) {
  const handleChange = (info) => {
    let newFileList = [...info.fileList]
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2)

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
    })

    setUploadFileList(newFileList)
  }

  const beforeUpload = (file) => {
    if (!file.type.startsWith('image/')) {
      message.error(`${file.name} is not an image`)
    }
    return file.type.startsWith('image/') ? true : Upload.LIST_IGNORE
  }

  return (
    <StyledUpload
      beforeUpload={beforeUpload}
      onChange={handleChange}
      multiple={false}
      listType="picture"
      fileList={uploadFileList}
      action="http://localhost:8000/upload"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>UPLOAD</Button>
    </StyledUpload>
  )
}

const StyledUpload = styled(Upload)`
  .ant-upload.ant-upload-select {
    display: flex;
    justify-content: flex-end;
  }
`
