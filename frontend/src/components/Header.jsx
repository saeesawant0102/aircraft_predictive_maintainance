import { UserCog } from "lucide-react";

import "./Header.css";

function Header() {

  return (

    <div className="header">

      <div className="header-title">

        <h2>

          Dashboard

        </h2>

        <p>

          Aircraft Engine Predictive Maintenance Dashboard

        </p>

      </div>

      <div className="admin-profile">

        <div className="admin-avatar">

          <UserCog
            size={28}
          />

        </div>

        <div className="admin-info">

          <h4>

            Admin

          </h4>

          <p>

            Maintenance Engineer

          </p>

          <p className="online">

            ● Online

          </p>

        </div>

      </div>

    </div>

  );

}

export default Header;