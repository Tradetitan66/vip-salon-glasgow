import { business } from "../data/locations";
import type { SalonLocation } from "../data/types";

type BookingPanelProps = {
  location: SalonLocation | null;
};

export default function BookingPanel({ location }: BookingPanelProps) {
  return (
    <div
      className="booking-panel"
      role="region"
      aria-label="Booking options"
      aria-live="polite"
      aria-atomic="true"
    >
      {location && (
        <div className="booking-panel__inner" key={location.id}>
          <h3 className="booking-panel__title">{location.name}</h3>

          {location.bookingOptions.length > 0 ? (
            <>
              <p className="booking-panel__intro">
                Choose a booking option below to secure your appointment.
              </p>
              <div className="booking-panel__actions">
                {location.bookingOptions.map((option) => (
                  <a
                    key={option.label}
                    className="btn btn--primary booking-panel__link"
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="booking_clicked"
                    data-location={location.id}
                    data-booking-provider={providerKey(option.label)}
                  >
                    {option.label}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="booking-panel__intro">Online booking coming soon.</p>
              <a
                className="btn btn--primary booking-panel__link"
                href={business.phoneUri}
                data-event="telephone_clicked"
                data-location={location.id}
                data-context="location_booking"
              >
                Call to book
              </a>
            </>
          )}

          <p className="booking-panel__footnote">{business.payment}</p>
        </div>
      )}
    </div>
  );
}

function providerKey(label: string): string {
  if (label.toLowerCase().includes("booksy")) return "booksy";
  if (label.toLowerCase().includes("treatwell")) return "treatwell";
  return label.toLowerCase().replace(/\s+/g, "-");
}
