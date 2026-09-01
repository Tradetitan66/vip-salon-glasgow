import { business } from "../data/locations";

export default function AnnouncementBar() {
  return (
    <div className="announcement" role="region" aria-label="Announcements">
      <p className="announcement__inner">
        <span className="announcement__text">{business.tagline}</span>
        <span className="announcement__dot" aria-hidden="true">
          ·
        </span>
        <span className="announcement__text">{business.payment}</span>
      </p>
    </div>
  );
}
