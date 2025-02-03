export interface SearchResult {
    id: string;
    alt_description: string;
    urls: { regular: string; full: string };
    likes: number;
    views: number;
    downloads: number;
}

export interface ModalProps {
    photo: {
      id: string;
      alt_description: string;
      urls: { full: string };
      likes: number;
      views: number;
      downloads: number;
    } | null;
    onClose: () => void;
  }