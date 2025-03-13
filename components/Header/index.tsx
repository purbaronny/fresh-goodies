import FilterAndSearch from "../FilterAndSearch"

const Header: React.FC<{ onSearch: (query: string, sortBy: string) => void }> = ({ onSearch }) => {
  return (
    <header className=" pt-14 px-4 pb-4 flex justify-between">
      <h1 className="font-semibold text-2xl">Fresh Goodies</h1>
      <FilterAndSearch onSearch={onSearch}/>
    </header>
  )
}

export default Header;