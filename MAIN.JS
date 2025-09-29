import React, { useMemo, useState } from "react";
import "./propertyfish-home.css";

export default function PropertyFishHomeV3() {
  // ---- State ----
  const [city, setCity] = useState("Hyderabad");
  const [kw, setKw] = useState("");
  const [bhk, setBhk] = useState("2 BHK");
  const [purpose, setPurpose] = useState("Buy"); // used in sticky search
  const [ownerOnly, setOwnerOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const chipList = ["Ready-to-Move", "New Projects", "Budget ≤ ₹50L", "Verified Only", "Owner Listings"];
  const [activeChips, setActiveChips] = useState(new Set());

  // ---- Mock data ----
  const aptSubs = useMemo(
    () => [
      "Gachibowli • ₹1.25 Cr • 1,450 sqft",
      "Miyapur • ₹78L • 1,100 sqft",
      "Narsingi • ₹1.10 Cr • 1,300 sqft",
      "Kokapet • ₹1.45 Cr • 1,520 sqft",
    ],
    []
  );
  const plotSubs = useMemo(
    () => [
      "HMDA • 200 sqyd • Mokila",
      "DTCP • 167 sqyd • Bibinagar",
      "HMDA • 300 sqyd • Shankarpally",
    ],
    []
  );
  const villaSubs = useMemo(
    () => [
      "Kompally • ₹2.1 Cr • 2,400 sqft",
      "Nizampet • ₹1.8 Cr • 2,100 sqft",
    ],
    []
  );
  const owners = useMemo(
    () => [
      "Owner: 2 BHK • Miyapur • ₹62L",
      "Owner: 3 BHK • Narsingi • ₹1.2Cr",
      "Owner: Plot • 167 sqyd • Bibinagar",
    ],
    []
  );
  const projects = useMemo(
    () => ["Project • Launch Offer", "Pre-launch • Financial District", "Offer • Kokapet"],
    []
  );

  // ---- Handlers ----
  const toggleChip = (label) => {
    const next = new Set(activeChips);
    if (next.has(label)) next.delete(label);
    else next.add(label);
    setActiveChips(next);
    console.log("chip_toggle", { chip: label, active: next.has(label) });
  };

  const onSearchMain = () => {
    const payload = {
      city,
      kw,
      bhk,
      ownerOnly,
      verifiedOnly,
      chips: Array.from(activeChips),
    };
    console.log("search_submit", payload);
    alert("Search submitted (see console)");
  };

  const onSearchSticky = () => {
    console.log("search_submit_sticky", { city, kw, purpose });
    alert("Search (sticky)");
  };

  // ---- Subcomponents ----
  const Chip = ({ label }) => (
    <button
      type="button"
      className={`chip ${activeChips.has(label) ? "active" : ""}`}
      onClick={() => toggleChip(label)}
      aria-pressed={activeChips.has(label)}
    >
      {label}
    </button>
  );

  const Card = ({ title, sub }) => (
    <article className="card" onClick={() => console.log("card_click", { title })} role="button" tabIndex={0}
      onKeyDown={(e)=>{ if(e.key==='Enter') console.log('card_click', {title}); }}>
      <div className="thumb" aria-hidden="true" />
      <div className="meta">
        <div className="row">
          <div className="title">{title}</div>
          <span className="badge">Verified</span>
        </div>
        <div className="subline">{sub}</div>
        <div className="row">
          <span className="subline">₹ EMI • psf info</span>
          <span className="whats">WhatsApp</span>
        </div>
      </div>
    </article>
  );

  const Pill = ({ label }) => (
    <div className="tile" role="button" tabIndex={0}
      onClick={() => console.log("pill_click", { label })}
      onKeyDown={(e)=>{ if(e.key==='Enter') console.log('pill_click', {label}); }}>
      {label} →
    </div>
  );

  return (
    <div className="pf-root">
      {/* Header */}
      <header>
        <div className="nav">
          <div className="logo">PropertyFish</div>
          <div className="nav-right">
            <a href="#owners">Owner-Listed</a>
            <a href="#new-projects">New Projects</a>
            <a className="list-cta" href="#list">List Property</a>
          </div>
        </div>

        {/* Sticky search under the nav */}
        <div className="sticky-search" role="search">
          <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)}>
            <option>Hyderabad</option>
            <option>Vijayawada</option>
            <option>Gurugram</option>
            <option>Mumbai</option>
          </select>

          <input
            placeholder="Locality / Project / Landmark"
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            aria-label="Keyword"
          />

          <select aria-label="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option>Buy</option>
            <option>Rent</option>
          </select>

          <button onClick={onSearchSticky}>Search</button>
        </div>
      </header>

      {/* Main */}
      <main className="container">
        {/* Hero */}
        <section className="hero">
          <div className="panel">
            <h1 className="headline">Find your next home — fast &amp; verified</h1>
            <p className="sub">
              Apartments first, then Plots &amp; Villas. Toggle Owner-Listed and Verified to narrow results.
            </p>

            <div className="searchbar" role="search">
              <input
                id="kw2"
                placeholder="Locality / Project / Landmark"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                aria-label="Keyword"
              />
              <select id="city2" value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
                <option>Hyderabad</option>
                <option>Vijayawada</option>
                <option>Gurugram</option>
                <option>Mumbai</option>
              </select>
              <select id="bhk" value={bhk} onChange={(e) => setBhk(e.target.value)} aria-label="BHK">
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4+ BHK</option>
              </select>
              <button id="search" onClick={onSearchMain}>Search</button>
            </div>

            <div className="chips" aria-label="Quick filters">
              {chipList.map((c) => (
                <Chip key={c} label={c} />
              ))}
            </div>

            <div className="toggles">
              <label>
                <input
                  type="checkbox"
                  checked={ownerOnly}
                  onChange={(e) => setOwnerOnly(e.target.checked)}
                />{" "}
                From Owners Only
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />{" "}
                Verified Only
              </label>
            </div>

            <div className="trust" aria-label="Trust badges">
              <span className="badge">RERA-aware</span>
              <span className="badge">WhatsApp lead ready</span>
              <span className="badge">Secure payments</span>
            </div>
          </div>

          <div className="illus" aria-hidden="true">Hero Illustration Placeholder</div>
        </section>

        {/* Sections */}
        <section id="apartments" className="section">
          <h2>
            Apartments / Flats <span className="badge">Highest Demand</span>
          </h2>
          <p className="kicker">
            2/3 BHK near IT corridors and metro. Shows price, psf, EMI, and verified badges.
          </p>
          <div className="grid" id="grid-apartments">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={`apt-${i}`} title={i % 2 ? "3 BHK" : "2/3 BHK"} sub={aptSubs[i % aptSubs.length]} />
            ))}
          </div>
          <a className="cta" href="#all-apartments" id="cta-apartments">
            See all apartments →
          </a>
        </section>

        <section id="plots" className="section">
          <h2>Residential Plots</h2>
          <p className="kicker">HMDA/DTCP approved plots with layout thumbnails and KML map links.</p>
          <div className="grid" id="grid-plots">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={`plot-${i}`} title="Residential Plot" sub={plotSubs[i % plotSubs.length]} />
            ))}
          </div>
          <a className="cta" href="#all-plots" id="cta-plots">
            Explore plots →
          </a>
        </section>

        <section id="villas" className="section">
          <h2>Villas &amp; Row Houses</h2>
          <p className="kicker">Premium, low-density living with community amenities and green views.</p>
          <div className="grid" id="grid-villas">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={`villa-${i}`} title="3/4 BHK Villa" sub={villaSubs[i % villaSubs.length]} />
            ))}
          </div>
          <a className="cta" href="#all-villas" id="cta-villas">
            See premium homes →
          </a>
        </section>

        <section id="owners" className="section">
          <h2>From Owners — Fresh Today</h2>
          <div className="strip" id="strip-owners">
            {Array.from({ length: 8 }).map((_, i) => (
              <Pill key={`owner-${i}`} label={owners[i % owners.length]} />
            ))}
          </div>
          <a className="cta" href="#owner-listings" id="cta-owners">
            View all owner listings →
          </a>
        </section>

        <section id="new-projects" className="section">
          <h2>New Projects / Builder Launches</h2>
          <div className="strip" id="strip-projects">
            {Array.from({ length: 8 }).map((_, i) => (
              <Pill key={`proj-${i}`} label={projects[i % projects.length]} />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Ready-to-Move Homes</h2>
          <div className="strip" id="strip-rtm">
            {Array.from({ length: 8 }).map((_, i) => (
              <Pill key={`rtm-${i}`} label="RTM: 3 BHK • Narsingi" />
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Top Localities</h2>
          <div className="strip">
            {["Gachibowli", "Kokapet", "Narsingi", "Bachupally", "Miyapur", "Kompally"].map((loc) => (
              <div
                key={loc}
                className="tile"
                role="button"
                tabIndex={0}
                onClick={() => console.log("locality_click", { locality: loc })}
                onKeyDown={(e)=>{ if(e.key==='Enter') console.log('locality_click', {locality: loc}); }}
              >
                {loc} →
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="foot">
          <div>
            <h2 style={{ margin: 0, marginBottom: 6 }}>List your property on PropertyFish</h2>
            <p style={{ margin: 0, color: "#9ca3af" }}>
              Owners • Agents • Builders — get verified badges and more visibility.
            </p>
          </div>
          <a className="cta" href="#list">Start listing →</a>
        </div>
      </footer>
    </div>
  );
}