import "./EngineDetails.css";

function RecommendationCard({ recommendation, status }) {

    const getClass = () => {

        switch(status){

            case "Healthy":
                return "recommendation-green";

            case "Warning":
                return "recommendation-yellow";

            default:
                return "recommendation-red";

        }

    };

    return (

        <div className="engine-card">

            <h2>
                Maintenance Recommendation
            </h2>

            <div className={getClass()}>

                {recommendation}

            </div>

        </div>

    );

}

export default RecommendationCard;