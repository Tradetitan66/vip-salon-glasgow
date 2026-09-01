import type { SalonLocation } from "../data/types";

type LocationCardProps = {
  location: SalonLocation;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function LocationCard({
  location,
  selected,
  onSelect,
}: LocationCardProps) {
  return (
    <button
      type="button"
      className={`location-card${selected ? " is-selected" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(location.id)}
      data-location={location.id}
      data-event="location_selected"
    >
      <span className="location-card__name">{location.name}</span>
      <span className="location-card__check" aria-hidden="true">
        {selected ? "✓ Selected" : "Choose"}
      </span>
    </button>
  );
}
