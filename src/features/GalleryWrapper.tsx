import { ReactNode } from "react"
import styled from "styled-components"

interface GalleryWrapperProps {
    children: ReactNode
}

function GalleryWrapper({children}: GalleryWrapperProps) {
  return (
    <FlexedList>{children}</FlexedList>
  )
}

export default GalleryWrapper

const FlexedList = styled.ul`
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-direction: row;
    flex-wrap: wrap;
`