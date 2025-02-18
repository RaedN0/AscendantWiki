package com.raedn.ascendantwiki.service;

import com.raedn.ascendantwiki.model.Loadout;
import com.raedn.ascendantwiki.model.User;
import com.raedn.ascendantwiki.repository.LoadoutRepository;
import com.raedn.ascendantwiki.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoadoutService {
    private final LoadoutRepository loadoutRepository;
    private final UserRepository userRepository;

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