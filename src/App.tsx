import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import History from "./pages/History"
import PageNotFound from "./pages/PageNotFound"
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"

function App() {
  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route index element={<Navigate replace to="home"/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="history" element={<History/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
