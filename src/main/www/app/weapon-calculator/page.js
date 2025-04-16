'use client';

import { useState } from 'react';
import InfoModal from '../components/calculator/InfoModal';
import Sidebar from '../components/calculator/Sidebar';
import WeaponSelection from '../components/calculator/WeaponSelection';
import Comparison from '../components/calculator/Comparison';
import AttachmentSelection from '../components/calculator/AttachmentSelection';
import ShieldSelection from '../components/calculator/ShieldSelection';
import { Box } from '@mui/material';
import '../styles/weapon-calculator.css';

export default function WeaponCalculator() {
    const [selectedWeapon, setSelectedWeapon] = useState();
    const [selectedShield, setSelectedShield] = useState();
    const [selectedAttachments, setSelectedAttachments] = useState([]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'flex-start', // Align content from top
                padding: '20px',
                gap: '20px', // Space between sidebar and calculator
            }}
        >

            <Box
                className="calculator"
                sx={{
                    backgroundColor: '#2a2a2a',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                    width: '100%',
                    maxWidth: '700px',
                }}
            >
                <h1>Weapon Damage Calculator</h1>
                <hr className="section-divider" />

                <WeaponSelection
                    selectedWeapon={selectedWeapon}
                    setSelectedWeapon={setSelectedWeapon}
                />

                <ShieldSelection
                    selectedShield={selectedShield}
                    setSelectedShield={setSelectedShield}
                />

                <AttachmentSelection
                    selectedAttachments={selectedAttachments}
                    setSelectedAttachments={setSelectedAttachments}
                />

                <Comparison
                    weapon={selectedWeapon}
                    attachments={selectedAttachments}
                    setSelectedWeapon={setSelectedWeapon}
                    setSelectedAttachments={setSelectedAttachments}
                />
            </Box>
            <Sidebar
                weapon={selectedWeapon}
                shield={selectedShield}
                attachments={selectedAttachments}
            />
        </Box>
    );
}
