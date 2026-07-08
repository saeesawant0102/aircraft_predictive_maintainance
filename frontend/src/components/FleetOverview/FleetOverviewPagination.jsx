import "./FleetOverview.css";

function FleetOverviewPagination({
  currentPage,
  totalPages,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) {
  const start =
    (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  return (
    <div className="pagination">

      <div>
        Showing <strong>{start}</strong>–
        <strong>{end}</strong> of{" "}
        <strong>{totalItems}</strong> engines
      </div>

      <div className="page-buttons">

        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          ◀
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => (
            <button
              key={i}
              className={`page-btn ${
                currentPage === i + 1
                  ? "active-page"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(i + 1)
              }
            >
              {i + 1}
            </button>
          )
        )}

        <button
          className="page-btn"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          ▶
        </button>

      </div>

    </div>
  );
}

export default FleetOverviewPagination;