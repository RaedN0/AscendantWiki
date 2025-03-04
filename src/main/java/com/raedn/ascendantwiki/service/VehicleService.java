package com.raedn.ascendantwiki.service;

import com.raedn.ascendantwiki.model.Vehicle;
import com.raedn.ascendantwiki.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(long id) {
        vehicleRepository.deleteById(id);
    }
}
