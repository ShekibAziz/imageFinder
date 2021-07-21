import React, { useState } from 'react'
import { AutoComplete } from 'antd'

export default function SearchBar({ images, searchText, setSearchText }) {
  const [options, setOptions] = useState([])
  const imagesTitle = images.map((img) => img.title)

  const onSearch = (searchTerm) => {
    const resultsContainingSearchTerm = !searchTerm
      ? []
      : imagesTitle
          .filter((imgTitle) => {
            const cleanImageTitle = imgTitle?.trim()?.toLowerCase()
            const cleanSearchTerm = searchTerm?.trim()?.toLowerCase()
            return cleanImageTitle.includes(cleanSearchTerm)
          })
          .map((value) => ({ value }))

    setOptions(resultsContainingSearchTerm)
  }

  const onChange = (data) => {
    setSearchText(data)
  }

  return (
    <AutoComplete
      value={searchText}
      options={options}
      style={{
        width: 450,
      }}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="Search images...."
    />
  )
}
