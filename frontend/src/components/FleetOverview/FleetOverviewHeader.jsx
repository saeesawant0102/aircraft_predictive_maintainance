import "./FleetOverview.css";

function FleetOverviewHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  exportCSV,
}) {
  return (
    <div className="fleet-header">

      <div className="fleet-header-top">

        <div className="fleet-header-title">
          <h2>Fleet Overview</h2>
          <p>
            Monitor the health and Remaining Useful Life of every engine in
            your fleet.
          </p>
        </div>

        <button
          className="export-btn"
          onClick={exportCSV}
        >
          Export CSV
        </button>

      </div>

      <div className="fleet-controls">

        <input
          className="fleet-input"
          type="text"
          placeholder="🔍 Search Engine ID..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="fleet-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Healthy">
            Healthy
          </option>

          <option value="Warning">
            Warning
          </option>

          <option value="Critical">
            Critical
          </option>
        </select>

        <select
          className="fleet-select"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="engine">
            Engine ID
          </option>

          <option value="cycle">
            Cycle
          </option>

          <option value="health">
            Health Score
          </option>

          <option value="rul">
            Predicted RUL
          </option>
        </select>

      </div>

    </div>
  );
}

export default FleetOverviewHeader;