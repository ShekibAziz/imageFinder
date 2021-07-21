import React from 'react'
import { Image as AntImage } from 'antd'
import styled from 'styled-components'
export default function Image(props) {
  return <StyledImage {...props} />
}

const StyledImage = styled(AntImage)`
  object-fit: cover;
`
