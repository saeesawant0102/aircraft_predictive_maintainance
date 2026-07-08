import "./EngineDetails.css";

function OperatingConditions({ engine }) {
  const settings = [
    {
      title: "Operating Setting 1",
      value: engine.op_setting_1,
      icon: "⚙️",
    },
    {
      title: "Operating Setting 2",
      value: engine.op_setting_2,
      icon: "🌡️",
    },
    {
      title: "Operating Setting 3",
      value: engine.op_setting_3,
      icon: "✈️",
    },
  ];

  return (
    <div className="engine-card">

      <h2>Operating Conditions</h2>

      <div className="operation-grid">

        {settings.map((item) => (
          <div
            key={item.title}
            className="operation-card"
          >

            <div className="operation-title">
              {item.title}
            </div>

            <div className="operation-value">
              {Number(item.value).toFixed(4)}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default OperatingConditions;