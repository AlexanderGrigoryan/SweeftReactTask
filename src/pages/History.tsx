import { useCallback, useEffect, useState } from "react";
import { SearchResult } from "../type";
import Button from "../ui/Button"
import styled from "styled-components";
import GalleryWrapper from "../features/GalleryWrapper";
import Spinner from "../ui/Spinner";

interface HistoryProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  photos: SearchResult[]
  setPhotos: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>
  fetchPhotos: (query: string, page: number) => Promise<SearchResult[]>
}

function History({query, setQuery, photos, setPhotos, page,  setPage, loading, setLoading, hasMore, setHasMore, fetchPhotos}: HistoryProps) {
  const [history] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );

   useEffect(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(false);
  }, [setPhotos, setPage, setHasMore]);

   const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setPhotos([]); 
    setPage(1);
    setLoading(true);
    
    const results = await fetchPhotos(searchQuery, 1);
    setPhotos(results);
    setHasMore(results.length > 0);
    setLoading(false);
  }, [fetchPhotos, setHasMore, setLoading, setPage, setPhotos, setQuery]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !query) return;
    setLoading(true);
    const results = await fetchPhotos(query, page);
    setPhotos((prev) => [...prev, ...results.filter((photo) => !prev.some(p => p.id === photo.id))]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(results.length > 0);
    setLoading(false);
  }, [hasMore, loading, query, page, fetchPhotos, setHasMore, setPage, setLoading, setPhotos]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadMore]);

  return (
    <>
      <h3>Queries history:</h3>
      <FlexedDiv>
        {history.map((term) => (
          <Button key={term} onClick={() => handleSearch(term)} >
            {term}
          </Button>
        ))}
      </FlexedDiv>
      <GalleryWrapper>
          {loading && <Spinner/>}
              {photos.map((photo) => (
                <li key={photo.id}>
                  <StyledImage src={photo.urls.regular} alt={photo.alt_description} />
                </li>
              ))}
        </GalleryWrapper>
    </>
  )
}

export default History

const FlexedDiv = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`

const StyledImage = styled.img`
width: 300px;
height: 200px;
`