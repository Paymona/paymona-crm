import React from 'react'
import styled from 'styled-components'
import SvgTemplate from './SvgTemplate'

const Svg = styled(SvgTemplate)` 
  width: ${props => props.size}px; 
  height: ${props => props.size}px;
`

const InfoOutline = ({ 
  className,
  size=24
}) => ( 
  <Svg viewBox='0 0 24 24' className={className} size={size} fill='currentColor'>   
    <path 
      fill='currentColor'
      d="M13 9L11 9L11 7L13 7L13 9ZM13 17L11 17L11 11L13 11L13 17ZM12.01 22C17.53 22 22 17.52 22 12C22 6.48 17.53 2 12.01 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12.01 22ZM12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z"
    />
  </Svg>
)

export default InfoOutline