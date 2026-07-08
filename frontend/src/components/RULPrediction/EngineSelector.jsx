import "./RULPrediction.css";

function EngineSelector({
  fleet,
  selectedEngine,
  setSelectedEngine,
}) {

  return (

    <div className="rul-header">

      <div>

        <h1>

          Remaining Useful Life Prediction

        </h1>

        <p>

          Predict remaining operational life of aircraft engines

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

export default EngineSelector;