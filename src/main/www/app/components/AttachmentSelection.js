import { useEffect, useState, useRef } from "react";
import AttachmentService from "@/app/services/AttachmentService";

export default function AttachmentSelection({
  selectedAttachments,
  setSelectedAttachments,
}) {
  const [optics, setOptics] = useState([]);
  const [barrels, setBarrels] = useState([]);
  const [grips, setGrips] = useState([]);

  const [selectedOptic, setSelectedOptic] = useState({
    name: "None",
    multiplier: 1,
  });
  const [selectedBarrel, setSelectedBarrel] = useState({
    name: "None",
    multiplier: 1,
  });
  const [selectedGrip, setSelectedGrip] = useState({
    name: "None",
    multiplier: 1,
  });

  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (!isInternalUpdate.current) {
      AttachmentService.getAttachmentByType("OPTIC").then((data) => {
        setOptics([{ name: "None", multiplier: 1 }, ...data]);
      });
      AttachmentService.getAttachmentByType("BARREL").then((data) => {
        setBarrels([{ name: "None", multiplier: 1 }, ...data]);
      });
      AttachmentService.getAttachmentByType("GRIP").then((data) => {
        setGrips([{ name: "None", multiplier: 1 }, ...data]);
      });
      if (selectedAttachments.length === 3) {
        setSelectedOptic(selectedAttachments[0]);
        setSelectedBarrel(selectedAttachments[1]);
        setSelectedGrip(selectedAttachments[2]);
      }
    } else {
      isInternalUpdate.current = false;
    }
  }, [selectedAttachments]);

  useEffect(() => {
    const newAttachments = [selectedOptic, selectedBarrel, selectedGrip];
    setSelectedAttachments(newAttachments);

    isInternalUpdate.current = true;
  }, [selectedOptic, selectedBarrel, selectedGrip, setSelectedAttachments]);

  return (
    <>
      <div className="section attachment-section">
        <h2>Select Attachments</h2>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Optic">
            Optic
            <br />
            <span className="selected-attachment">
              {selectedOptic.name}
            </span>
          </h3>
          <div className="attachment-buttons">
            {optics.map((optic, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedOptic?.name === optic.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedOptic(optic)}
              >
                {optic.name}
              </button>
            ))}
          </div>
        </div>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Barrel">
            Barrel
            <br />
            <span className="selected-attachment">
              {selectedBarrel.name}
            </span>
          </h3>
          <div className="attachment-buttons">
            {barrels.map((barrel, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedBarrel?.name === barrel.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedBarrel(barrel)}
              >
                {barrel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="attachment-category">
          <h3 className="attachment-title" data-slot-name="Grip">
            Grip
            <br />
            <span className="selected-attachment">
              {selectedGrip.name}
            </span>
          </h3>
          <div className="attachment-buttons">
            {grips.map((grip, index) => (
              <button
                key={index}
                className={`attachment-button ${
                  selectedGrip?.name === grip.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSelectedGrip(grip)}
              >
                {grip.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
