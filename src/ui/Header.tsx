import styled from 'styled-components'
import MainNav from './MainNav'

function Header() {
  return (
    <StyledHeader>
        <MainNav/>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
background-color: var(--color-grey-0);
padding: 1.2rem 4.8rem;
border-bottom: 1px solid var(--color-grey-100);
`