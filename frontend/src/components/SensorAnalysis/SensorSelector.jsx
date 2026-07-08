import "./SensorAnalysis.css";

function SensorSelector({
  fleet,
  selectedEngine,
  setSelectedEngine,
}) {
  return (
    <div className="sensor-header">

      <div>

        <h1>Sensor Analysis</h1>

        <p>
          Analyze sensor behaviour across engine life cycle
        </p>

      </div>

      <div className="selector-box">

        <label>

          Select Engine

        </label>

        <select
          value={selectedEngine}
          onChange={(e) =>
            setSelectedEngine(
              Number(e.target.value)
            )
          }
        >

          {fleet.map((engine) => (

            <option
              key={engine.engine_id}
              value={engine.engine_id}
            >

              Engine {engine.engine_id}

            </option>

          ))}

        </select>

      </div>

    </div>
  );
}

export default SensorSelector;