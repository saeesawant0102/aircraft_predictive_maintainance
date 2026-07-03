import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
        }}
      >
        <Header />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;