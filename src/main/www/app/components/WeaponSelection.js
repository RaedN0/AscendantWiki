"use client";

import {useEffect, useState} from "react";
import WeaponService from "@/app/services/WeaponService";

export default function WeaponSelection({ selectedWeapon, setSelectedWeapon }) {
    const [weapons, setWeapons] = useState([]);

    useEffect(() => {
        WeaponService.getWeapons().then(r => {
            setWeapons(r);
        })
    }, [])

  return (
    <>
      <div className="section weapon-section">
        <h2>Choose Your Weapon</h2>
        <div className="weapon-buttons">
          {weapons?.map((weapon, index) => (
            <button
              key={index}
              className={`weapon-button ${
                selectedWeapon?.name === weapon.name ? "selected" : ""
              }`}
              onClick={() => setSelectedWeapon(weapon)}
            >
              {weapon.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
