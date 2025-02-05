import { useState } from "react";
import { SearchResult} from "../type";
import Gallery from "../features/Gallery"
import SearchInput from "../ui/SearchInput"
import Modal from "../ui/Modal";

interface HomeProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  photos: SearchResult[];
  setPhotos: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
  fetchPhotos: (query: string, page: number) => Promise<SearchResult[]>
}

function Home({query, setQuery, photos, setPhotos, page, setPage, loading, setLoading, hasMore, setHasMore, fetchPhotos}: HomeProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<SearchResult | null>(null);
  
  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <Gallery 
        query={query} 
        photos={photos} 
        setPhotos={setPhotos} 
        page={page} 
        setPage={setPage} 
        loading={loading} 
        setLoading={setLoading} 
        hasMore={hasMore} 
        setHasMore={setHasMore} 
        fetchPhotos={fetchPhotos} 
        onPhotoClick={setSelectedPhoto} 
      />
      <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </>
  )
}

export default Home