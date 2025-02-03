import { Outlet } from "react-router"
import styled from "styled-components"
import Header from "./Header"

function AppLayout() {
  return (
    <div>
        <Header/>
        <Main>
          <Outlet/>
        </Main>
    </div>
  )
}

export default AppLayout

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem
`