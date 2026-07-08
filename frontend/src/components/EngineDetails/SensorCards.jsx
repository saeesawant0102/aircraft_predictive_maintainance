import "./EngineDetails.css";

function SensorCards({ engine }) {

    const sensors = [

        {
            name:"Sensor 2",
            value:engine.sensor_2
        },

        {
            name:"Sensor 4",
            value:engine.sensor_4
        },

        {
            name:"Sensor 11",
            value:engine.sensor_11
        },

        {
            name:"Sensor 15",
            value:engine.sensor_15
        },

        {
            name:"Sensor 17",
            value:engine.sensor_17
        }

    ];

    return(

        <>

        <h2
        style={{
            color:"white",
            marginBottom:"15px"
        }}
        >
            Key Sensors
        </h2>

        <div className="sensor-grid">

        {

            sensors.map(sensor=>(

                <div
                key={sensor.name}
                className="sensor-card"
                >

                    <p>{sensor.name}</p>

                    <h2>

                        {Number(sensor.value).toFixed(2)}

                    </h2>

                </div>

            ))

        }

        </div>

        </>

    );

}

export default SensorCards;