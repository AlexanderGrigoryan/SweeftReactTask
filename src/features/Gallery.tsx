import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import GalleryWrapper from "./GalleryWrapper";
import Spinner from "../ui/Spinner"

interface SearchResult {
  id: string;
  alt_description: string;
  urls: { regular: string };
}

interface GalleryProps {
  query: string;
}

const API_URL = "https://api.unsplash.com/photos";
const SEARCH_URL = "https://api.unsplash.com/search/photos";
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchPhotos = async (query: string, page: number): Promise<SearchResult[]> => {
  try {
    const url = query
      ? `${SEARCH_URL}?query=${query}&page=${page}&per_page=20&client_id=${API_KEY}`
      : `${API_URL}?page=1&per_page=20&order_by=popular&client_id=${API_KEY}`;
    
    const { data } = await axios.get<{ results?: SearchResult[], total?: number }>(url);
    return query ? data.results || [] : (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return [];
  }
};

const Gallery: React.FC<GalleryProps> = ({query}) => {
  const [photos, setPhotos] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialPhotos = async () => {
      setLoading(true);
      const results = await fetchPhotos("", 1);
      setPhotos(results);
      setLoading(false);
    };
    loadInitialPhotos();
  }, []);

  useEffect(() => {
    if (query) {
      const searchPhotos = async () => {
        setLoading(true);
        const results = await fetchPhotos(query, 1);
        setPhotos(results);
        setPage(2);
        setHasMore(results.length > 0);
        setLoading(false);
      };
      searchPhotos();
    }
  }, [query]);

  const loadMore = async () => {
    if (!hasMore || loading || !query) return;
    setLoading(true);
    const results = await fetchPhotos(query, page);
    setPhotos((prev) => [...prev, ...results.filter((photo) => !prev.some(p => p.id === photo.id))]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(results.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    if (!query) return;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [query, page, loading]);

  return (
    <>
      <GalleryWrapper>
        {photos.map((photo) => (
          <div key={photo.id}>
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
`
