import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import axios from "axios"
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import History from "./pages/History"
import PageNotFound from "./pages/PageNotFound"

const queryClient = new QueryClient()

interface SearchResult {
  id: string;
  alt_description: string;
  urls: { regular: string };
}

const API_URL = "https://api.unsplash.com/photos";
const SEARCH_URL = "https://api.unsplash.com/search/photos";
const API_KEY = import.meta.env.VITE_API_KEY;

const cache = new Map<string, SearchResult[]>();

function App() {
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

    const fetchPhotos = useCallback(async (query: string, page: number): Promise<SearchResult[]> => {
      if (cache.has(`${query}-${page}`)) {
        return cache.get(`${query}-${page}`)!;
      }
      try {
        const url = query
          ? `${SEARCH_URL}?query=${query}&page=${page}&per_page=20&client_id=${API_KEY}`
          : `${API_URL}?page=1&per_page=20&order_by=popular&client_id=${API_KEY}`;
        
        const { data } = await axios.get<{ results?: SearchResult[], total?: number }>(url);
        const results = query ? data.results || [] : (Array.isArray(data) ? data : []);
        cache.set(`${query}-${page}`, results);
        return results;
      } catch (error) {
        console.error("Error loading data:", error);
        return [];
      }
    }, []); 

  return (
    <>
      <GlobalStyles/>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to="home"/>}/>
            <Route path="home" element={<Home query={query} setQuery={setQuery} photos={photos} setPhotos={setPhotos} page={page} setPage={setPage} loading={loading} setLoading={setLoading} hasMore={hasMore} setHasMore={setHasMore} fetchPhotos={fetchPhotos}/>}/>
            <Route path="history" element={<History query={query} setQuery={setQuery} photos={photos} setPhotos={setPhotos} page={page} setPage={setPage} loading={loading} setLoading={setLoading} hasMore={hasMore} setHasMore={setHasMore} fetchPhotos={fetchPhotos}/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
