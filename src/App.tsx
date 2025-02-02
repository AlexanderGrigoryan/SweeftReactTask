import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import History from "./pages/History"
import PageNotFound from "./pages/PageNotFound"

const queryClient = new QueryClient()

function App() {
  const [query, setQuery] = useState<string>("");

  return (
    <>
      <GlobalStyles/>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to="home"/>}/>
            <Route path="home" element={<Home query={query} setQuery={setQuery}/>}/>
            <Route path="history" element={<History/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
