package com.raedn.ascendantwiki.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.raedn.ascendantwiki.dto.LoadoutDTO;
import com.raedn.ascendantwiki.service.LoadoutService;
import com.raedn.ascendantwiki.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/loadouts")
public class LoadoutController {
    private final LoadoutService loadoutService;
    private final UserService userService;

    @GetMapping
    public List<LoadoutDTO> getAllLoadouts() {
        return loadoutService.getAllLoadouts().stream()
                .map(LoadoutDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{username}")
    public List<LoadoutDTO> getLoadoutsByUser(@PathVariable String username) {
        return loadoutService.getLoadoutsByUsername(username).stream()
                .map(LoadoutDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @PostMapping
    public LoadoutDTO createLoadout(@RequestBody LoadoutDTO loadoutDTO) {
        return LoadoutDTO.fromEntity(loadoutService.saveLoadout(loadoutDTO.toEntity(userService)));
    }

    @DeleteMapping("/{id}")
    public void deleteLoadout(@PathVariable Long id) {
        loadoutService.deleteLoadout(id);
    }
}