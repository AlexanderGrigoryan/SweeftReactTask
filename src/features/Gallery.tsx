import React, { useCallback, useEffect} from "react";
import { useDebounce } from "../hooks/useDebounce"; // Импортируем хук
import { SearchResult } from "../type";
import styled from "styled-components";
import GalleryWrapper from "./GalleryWrapper";
import Spinner from "../ui/Spinner";

interface GalleryProps {
  query: string;
  photos: SearchResult[];
  setPhotos: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPhotos: (query: string, page: number) => Promise<SearchResult[]>;
  onPhotoClick: (photo: SearchResult) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  query, photos, setPhotos, page, setPage, loading, setLoading, hasMore, setHasMore, fetchPhotos, onPhotoClick
}) => {
  const debouncedQuery = useDebounce(query, 700); 

  const saveSearchQuery = (searchQuery: string) => {
    const history: string[] = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (!history.some(item => item.toLowerCase() === searchQuery.toLowerCase())) {
      const updatedHistory = [searchQuery, ...history].slice(0, 100); 
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  useEffect(() => {
    const loadInitialPhotos = async () => {
      setLoading(true);
      const results = await fetchPhotos("", 1);
      setPhotos(results);
      setLoading(false);
    };
    loadInitialPhotos();
  }, [fetchPhotos, setLoading, setPhotos]);

  useEffect(() => {
    if (debouncedQuery) {
      const searchPhotos = async () => {
        setLoading(true);
        const results = await fetchPhotos(debouncedQuery, 1);
        setPhotos(results);
        setPage(2);
        setHasMore(results.length > 0);
        setLoading(false);
        saveSearchQuery(debouncedQuery);
      };
      searchPhotos();
    }
  }, [debouncedQuery, setHasMore, fetchPhotos, setLoading, setPage, setPhotos]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !debouncedQuery) return;
  
    setLoading(true);
    const results = await fetchPhotos(debouncedQuery, page);
  
    setPhotos((prev) => [...prev, ...results.filter((photo) => !prev.some(p => p.id === photo.id))]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(results.length > 0);
    setLoading(false);
  }, [hasMore, loading, debouncedQuery, page, fetchPhotos, setPhotos, setPage, setHasMore, setLoading]);
  
  useEffect(() => {
    if (!debouncedQuery) return;
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [debouncedQuery, page, loading, loadMore]);

  return (
    <>
      <GalleryWrapper>
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => onPhotoClick(photo)}>
            <StyledImage src={photo.urls.regular} alt={photo.alt_description} />
          </div>
        ))}
      </GalleryWrapper>
      {loading && <Spinner/>}
    </>
  );
};

export default Gallery;

const StyledImage = styled.img`
width: 300px;
height: 200px;
cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`
