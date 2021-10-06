import { useEffect } from "react";
import _ from "lodash";

import "./AxieHover.css";
import ReptileLogo from "../images/reptile.png";
import PlantLogo from "../images/plant.png";
import MechLogo from "../images/mech.png";
import DuskLogo from "../images/dusk.png";
import DawnLogo from "../images/dawn.png";
import BugLogo from "../images/bug.png";
import BirdLogo from "../images/bird.png";
import BeastLogo from "../images/beast.png";
import AquaticLogo from "../images/aquatic.png";

const axieColors = {
  reptile: "#dc8be4",
  plant: "#6cc000",
  mech: "#c6bdd4",
  dusk: "#129092",
  dawn: "#beceff",
  bug: "#ff5341",
  bird: "#ff8bbd",
  beast: "#ffb812",
  aquatic: "#00b8ce",
};

const classesLogo = {
  reptile: ReptileLogo,
  plant: PlantLogo,
  mech: MechLogo,
  dusk: DuskLogo,
  dawn: DawnLogo,
  bug: BugLogo,
  bird: BirdLogo,
  beast: BeastLogo,
  aquatic: AquaticLogo,
};

const AxieHover = ({ axie }) => {
  if (_.isEmpty(axie.details)) return null;

  return (
    <div className="axieHover__main">
      <div className="axieHover__header">
        <img src={axie.image} alt="axie-image" width={200} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="axieHover__nameWrapper">
            <img
              src={classesLogo[axie.class?.toLowerCase()]}
              alt=""
              width={30}
            />
            <span className="axieHover__name">{axie.name}</span>
          </div>
          <div>
            <span className="axieHover__id">#{axie.id}</span>
            <span className="axieHover__breed">{axie.breedCount}/7</span>
          </div>
        </div>
      </div>
      <div className="axieHover__content">
        <div className="axieHover__DWrapper">
          <h3 style={{ textAlign: "center" }}>D</h3>
          <div className="axieHover__D">
            <span
              style={{
                color: axieColors[axie.details.eyes.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.eyes.d.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.ears.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.ears.d.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.mouth.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.mouth.d.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.horn.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.horn.d.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.back.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.back.d.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.tail.d.class],
                padding: "5px 0",
              }}
            >
              {axie.details.tail.d.name}
            </span>
          </div>
        </div>
        <div className="axieHover__DWrapper">
          <h3 style={{ textAlign: "center" }}>R1</h3>
          <div className="axieHover__R1">
            <span
              style={{
                color: axieColors[axie.details.eyes.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.eyes.r1.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.ears.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.ears.r1.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.mouth.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.mouth.r1.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.horn.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.horn.r1.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.back.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.back.r1.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.tail.r1.class],
                padding: "5px 0",
              }}
            >
              {axie.details.tail.r1.name}
            </span>
          </div>
        </div>
        <div className="axieHover__DWrapper">
          <h3 style={{ textAlign: "center" }}>R2</h3>
          <div className="axieHover__R2">
            <span
              style={{
                color: axieColors[axie.details.eyes.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.eyes.r2.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.ears.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.ears.r2.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.mouth.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.mouth.r2.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.horn.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.horn.r2.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.back.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.back.r2.name}
            </span>
            <span
              style={{
                color: axieColors[axie.details.tail.r2.class],
                padding: "5px 0",
              }}
            >
              {axie.details.tail.r2.name}
            </span>
          </div>
        </div>
        <div className="axieHover__R1"></div>
        <div className="axieHover__R2"></div>
      </div>
    </div>
  );
};

export default AxieHover;
