package com.raedn.ascendantwiki.service;

import java.util.List;

import com.raedn.ascendantwiki.model.Loadout;
import com.raedn.ascendantwiki.repository.LoadoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoadoutService {
    private final LoadoutRepository loadoutRepository;

    public List<Loadout> getAllLoadouts() {
        return loadoutRepository.findAllWithRelations();
    }

    public List<Loadout> getLoadoutsByUsername(String username) {
        return loadoutRepository.findByUserUsernameWithRelations(username);
    }

    public Loadout saveLoadout(Loadout loadout) {
        return loadoutRepository.save(loadout);
    }

    public void deleteLoadout(Long id) {
        loadoutRepository.deleteById(id);
    }
}