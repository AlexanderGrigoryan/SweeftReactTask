import Gallery from "../features/Gallery"
import SearchInput from "../ui/SearchInput"

interface HomeProps {
query: string;
setQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Home({query, setQuery}: HomeProps) {
  return (
    <>
      <SearchInput query={query} setQuery={setQuery} />
      <Gallery query={query}/>
    </>
  )
}

export default Home