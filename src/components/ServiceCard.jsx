import "./ServiceCard.css";

import "./ServiceCard.css";

import generalCheckup from "../assets/services/general-checkup.png";
import vaccination from "../assets/services/vaccination.png";
import grooming from "../assets/services/grooming.png";
import dentalCleaning from "../assets/services/dental-cleaning.png";
import emergency from "../assets/services/emergency.png";
import allergy from "../assets/services/allergy.png";
import nutrition from "../assets/services/nutrition.png";
import followUp from "../assets/services/follow-up.png";


const serviceImages = {
  "General Checkup": generalCheckup,
  "Vaccination": vaccination,
  "Grooming": grooming,
  "Dental Cleaning": dentalCleaning,
  "Emergency Consultation": emergency,
  "Skin & Allergy Consultation": allergy,
  "Nutrition Consultation": nutrition,
  "Post-Treatment Follow-Up": followUp,
};

const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="service-card">

      <div className="service-image">
        <img
          src={serviceImages[service.name]}
          alt={service.name}
        />
      </div>

      <h3>{service.name}</h3>

      <p className="service-description">
        {service.description}
      </p>

      <button
        className="service-book-btn"
        onClick={() => onBook(service)}
      >
        Book Now →
      </button>

    </div>
  );
};

export default ServiceCard;