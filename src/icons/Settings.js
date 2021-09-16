import React from 'react'
import styled from 'styled-components'
import SvgTemplate from './SvgTemplate'

const Svg = styled(SvgTemplate)` 
  width: ${props => props.size}px; 
  height: ${props => props.size}px;
`

const Settings = ({ 
  className,
  size=24
}) => ( 
  <Svg viewBox='0 0 24 24' className={className} size={size} fill='currentColor'>   
    <path 
      fill='currentColor'
      d="M19.14 12.936C19.176 12.636 19.2 12.324 19.2 12C19.2 11.676 19.176 11.364 19.128 11.064L21.156 9.48002C21.336 9.33602 21.384 9.07202 21.276 8.86802L19.356 5.54402C19.236 5.32802 18.984 5.25602 18.768 5.32802L16.38 6.28802C15.876 5.90402 15.348 5.59202 14.76 5.35202L14.4 2.80802C14.364 2.56802 14.16 2.40002 13.92 2.40002H10.08C9.84 2.40002 9.648 2.56802 9.612 2.80802L9.252 5.35202C8.664 5.59202 8.124 5.91602 7.632 6.28802L5.244 5.32802C5.028 5.24402 4.776 5.32802 4.656 5.54402L2.736 8.86802C2.616 9.08402 2.664 9.33602 2.856 9.48002L4.884 11.064C4.836 11.364 4.8 11.688 4.8 12C4.8 12.312 4.824 12.636 4.872 12.936L2.844 14.52C2.664 14.664 2.616 14.928 2.724 15.132L4.644 18.456C4.764 18.672 5.016 18.744 5.232 18.672L7.62 17.712C8.124 18.096 8.652 18.408 9.24 18.648L9.6 21.192C9.648 21.432 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.364 21.432 14.388 21.192L14.748 18.648C15.336 18.408 15.876 18.084 16.368 17.712L18.756 18.672C18.972 18.756 19.224 18.672 19.344 18.456L21.264 15.132C21.384 14.916 21.336 14.664 21.144 14.52L19.14 12.936ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.40002 12 8.40002C13.98 8.40002 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"
    />
  </Svg>
)

export default Settings