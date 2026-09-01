import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationSelector from "./LocationSelector";
import ContactSection from "./ContactSection";

function setLocationParam(value: string | null) {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set("location", value);
  } else {
    url.searchParams.delete("location");
  }
  window.history.replaceState({}, "", url);
}

describe("LocationSelector", () => {
  beforeEach(() => {
    cleanup();
    setLocationParam(null);
  });

  it("shows no booking panel initially without a valid URL parameter", () => {
    render(<LocationSelector />);
    expect(screen.queryByText(/online booking coming soon/i)).toBeNull();
    expect(screen.queryByRole("link", { name: /book appointment/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /book with booksy/i })).toBeNull();
  });

  it("selecting Duke Street displays both verified booking options", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /duke street/i }));
    const booking = screen.getByText(/book with booksy/i);
    const treatwell = screen.getByText(/book with treatwell/i);
    expect(booking).toBeInTheDocument();
    expect(treatwell).toBeInTheDocument();
    expect(booking.closest("a")).toHaveAttribute(
      "href",
      "https://vipsalondukestreet.booksy.com/a",
    );
    expect(treatwell.closest("a")).toHaveAttribute(
      "href",
      "https://widget.treatwell.co.uk/place/vip-salon/",
    );
  });

  it("selecting Cumbernauld displays its correct Treatwell URL", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /cumbernauld/i }));
    const link = screen.getByRole("link", { name: /book appointment/i });
    expect(link).toHaveAttribute(
      "href",
      "https://widget.treatwell.co.uk/place/vip-salon-cumbernauld/",
    );
  });

  it("selecting Knightswood displays its correct Treatwell URL", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /knightswood/i }));
    const link = screen.getByRole("link", { name: /book appointment/i });
    expect(link).toHaveAttribute(
      "href",
      "https://widget.treatwell.co.uk/place/vip-aesthetics-lasering/?utm_medium=partner-ecosystem&utm_campaign=partner-instagram&utm_content=book-now",
    );
  });

  it("selecting Marbella shows Online booking coming soon", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /marbella/i }));
    expect(screen.getByText(/online booking coming soon/i)).toBeInTheDocument();
  });

  it("unconfigured locations show the call button", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /hillfoot/i }));
    expect(screen.getByText(/online booking coming soon/i)).toBeInTheDocument();
    const call = screen.getByRole("link", { name: /call to book/i });
    expect(call).toHaveAttribute("href", "tel:+447477535775");
  });

  it("does not crash when an invalid URL location is present", () => {
    setLocationParam("not-a-real-location");
    render(<LocationSelector />);
    expect(
      screen.getByRole("heading", { name: /where would you like to book/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/online booking coming soon/i)).toBeNull();
  });

  it("external booking links include secure attributes", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    await user.click(screen.getByRole("button", { name: /duke street/i }));
    const links = screen.getAllByRole("link");
    for (const link of links) {
      if (link.getAttribute("target") === "_blank") {
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
    expect(screen.getByRole("link", { name: /book with booksy/i })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("keyboard users can select a location", async () => {
    const user = userEvent.setup();
    render(<LocationSelector />);
    const duke = screen.getByRole("button", { name: /duke street/i });
    duke.focus();
    await user.keyboard("{Enter}");
    expect(
      within(screen.getByRole("region", { name: /booking options/i })).getByText(
        /duke street/i,
      ),
    ).toBeInTheDocument();
  });
});

describe("Contact and telephone links", () => {
  it("telephone CTAs link to tel:+447477535775", () => {
    render(<ContactSection />);
    const call = screen.getByRole("link", { name: /call 07477 535775/i });
    expect(call).toHaveAttribute("href", "tel:+447477535775");
  });
});
