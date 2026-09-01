import { useCallback, useEffect, useState } from "react";
import { locations } from "../data/locations";
import type { SalonLocation } from "../data/types";
import BookingPanel from "./BookingPanel";
import LocationCard from "./LocationCard";

const VALID_IDS = new Set(locations.map((l) => l.id));

export default function LocationSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    readInitialLocation(),
  );

  const selectedLocation: SalonLocation | null =
    locations.find((l) => l.id === selectedId) ?? null;

  useEffect(() => {
    const handlePopState = () => {
      const id = readLocationFromUrl();
      setSelectedId(id && VALID_IDS.has(id) ? id : null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    if (VALID_IDS.has(id)) {
      const url = new URL(window.location.href);
      url.searchParams.set("location", id);
      window.history.pushState({ location: id }, "", url);
    }
  }, []);

  const handleClear = useCallback(() => {
    setSelectedId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("location");
    window.history.pushState({}, "", url);
  }, []);

  return (
    <section
      className="locations section"
      id="locations"
      aria-labelledby="locations-heading"
    >
      <div className="container">
        <p className="section__eyebrow">Find your salon</p>
        <h2 className="section__heading" id="locations-heading">
          Where would you like to book?
        </h2>
        <p className="section__lede">
          Choose your nearest VIP Salon to view the correct booking options.
        </p>

        <div className="locations__grid" role="group" aria-label="Salon locations">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              selected={selectedId === location.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <BookingPanel location={selectedLocation} />

        {selectedLocation && (
          <div className="locations__reset">
            <button type="button" className="locations__reset-link" onClick={handleClear}>
              Choose another location
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function readLocationFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URL(window.location.href).searchParams.get("location");
}

function readInitialLocation(): string | null {
  const id = readLocationFromUrl();
  return id && VALID_IDS.has(id) ? id : null;
}
