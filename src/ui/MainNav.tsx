import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function MainNav(): JSX.Element {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/home">
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/history">
            <span>History</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }
`;
