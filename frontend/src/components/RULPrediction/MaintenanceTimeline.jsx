import "./RULPrediction.css";

function MaintenanceTimeline({ latest }) {

  const current = latest.cycle;

  const inspection = current + 30;

  const maintenance = current + 60;

  const failure =
    current + Math.round(latest.Predicted_RUL);

  return (

    <div className="timeline-card">

      <h2>

        Recommended Maintenance Timeline

      </h2>

      <div className="timeline">

        <div className="timeline-item">

          <div className="timeline-dot"/>

          <h3>

            Current

          </h3>

          <p>

            Cycle {current}

          </p>

        </div>

        <div className="timeline-item">

          <div className="timeline-dot yellow"/>

          <h3>

            Inspection

          </h3>

          <p>

            Cycle {inspection}

          </p>

        </div>

        <div className="timeline-item">

          <div className="timeline-dot orange"/>

          <h3>

            Maintenance

          </h3>

          <p>

            Cycle {maintenance}

          </p>

        </div>

        <div className="timeline-item">

          <div className="timeline-dot red"/>

          <h3>

            Estimated Failure

          </h3>

          <p>

            Cycle {failure}

          </p>

        </div>

      </div>

    </div>

  );

}

export default MaintenanceTimeline;