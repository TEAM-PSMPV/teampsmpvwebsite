import { products } from "../data";

export function ProductProof() {
  const supportingProducts = products.slice(1, 4);

  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="content">
        <div className="proof-intro">
          <div>
            <p className="eyebrow"><span className="proof-marker" aria-hidden="true" /> /SHIPPING, NOT SIGNALING</p>
            <h2 id="proof-title">IDEAS ARE MORE CONVINCING WHEN THEY HAVE A SURFACE.</h2>
          </div>
          <p>
            The stack matters because it ends in something usable. These are working product
            surfaces from the same system: focused tools with a name, a workflow and a door.
          </p>
        </div>

        <div className="proof-stage">
          <div className="proof-feature">
            <div className="proof-feature-header">
              <span>LEADFORGE / PIPELINE</span>
              <span>LIVE SURFACE / 02</span>
            </div>
            <div className="proof-dashboard">
              <aside className="proof-sidebar" aria-hidden="true">
                <span className="proof-sidebar-logo">LF</span>
                <span className="is-selected">Pipeline</span>
                <span>Contacts</span>
                <span>Reports</span>
                <span>Settings</span>
              </aside>
              <div className="proof-dashboard-main">
                <div className="proof-dashboard-heading">
                  <div>
                    <span className="proof-kicker">MONDAY / 09:42</span>
                    <strong>Lead pipeline</strong>
                  </div>
                  <span className="proof-add">+ ADD LEAD</span>
                </div>
                <div className="proof-pipeline">
                  <div><span>NEW</span><strong>24</strong></div>
                  <div><span>QUALIFIED</span><strong>09</strong></div>
                  <div><span>IN PROGRESS</span><strong>06</strong></div>
                  <div><span>WON</span><strong>03</strong></div>
                </div>
                <div className="proof-table" aria-hidden="true">
                  <div><span>ANAND HOSPITAL</span><em>Qualified</em><b>₹ 1.2L</b></div>
                  <div><span>ORBIT EDUCATION</span><em>In progress</em><b>₹ 80K</b></div>
                  <div><span>VERTEX CLINIC</span><em>New</em><b>₹ 42K</b></div>
                </div>
              </div>
            </div>
            <div className="proof-feature-caption">
              <span>Inspect the result, then open the system.</span>
              <a href={products[2].url} target="_blank" rel="noopener noreferrer">Open LeadForge <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="proof-list">
            {supportingProducts.map((product, index) => (
              <a
                className="proof-list-item"
                href={product.url}
                key={product.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="proof-list-number">0{index + 1}</span>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.positioning}</small>
                </span>
                <span className="proof-list-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
