import { useEffect, useMemo, useState } from "react";

import Layout from "../components/Layout";

import FleetOverviewHeader from "../components/FleetOverview/FleetOverviewHeader";
import FleetOverviewSummary from "../components/FleetOverview/FleetOverviewSummary";
import FleetOverviewTable from "../components/FleetOverview/FleetOverviewTable";
import FleetOverviewPagination from "../components/FleetOverview/FleetOverviewPagination";

import API from "../services/api";

function FleetOverview() {
  const [fleetData, setFleetData] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("engine");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    API.get("/fleet")
      .then((res) => {
        setFleetData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const exportCSV = () => {
    window.open(
      "http://127.0.0.1:8000/fleet/download",
      "_blank"
    );
  };

  const filteredData = useMemo(() => {
    let data = [...fleetData];

    // Search
    if (search.trim() !== "") {
      data = data.filter((engine) =>
        String(engine.engine_id)
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== "All") {
      data = data.filter(
        (engine) =>
          engine.Health_Status === statusFilter
      );
    }

    // Sorting
    switch (sortBy) {
      case "engine":
        data.sort(
          (a, b) =>
            a.engine_id - b.engine_id
        );
        break;

      case "cycle":
        data.sort(
          (a, b) => b.cycle - a.cycle
        );
        break;

      case "health":
        data.sort(
          (a, b) =>
            b.Health_Score -
            a.Health_Score
        );
        break;

      case "rul":
        data.sort(
          (a, b) =>
            a.Predicted_RUL -
            b.Predicted_RUL
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    fleetData,
    search,
    statusFilter,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length / itemsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const paginatedData =
    filteredData.slice(
      startIndex,
      endIndex
    );

  return (
    <Layout>
      <FleetOverviewHeader
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        exportCSV={exportCSV}
      />

      <FleetOverviewSummary
        data={filteredData}
      />

      <FleetOverviewTable
        data={paginatedData}
      />

      <FleetOverviewPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
      />
    </Layout>
  );
}

export default FleetOverview;