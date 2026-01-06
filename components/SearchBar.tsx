interface Props {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ city, setCity, onSearch }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter city"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-5 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
