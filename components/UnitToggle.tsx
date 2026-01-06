interface Props {
    unit: "metric" | "imperial";
    setUnit: React.Dispatch<React.SetStateAction<"metric" | "imperial">>;
  }
  
  export default function UnitToggle({ unit, setUnit }: Props) {
    return (
      <button
        onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        className="border px-3 py-1 rounded"
      >
        {unit === "metric" ? "°F" : "°C"}
      </button>
    );
  }
  