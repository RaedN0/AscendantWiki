package com.raedn.ascendantwiki.dto;

import com.raedn.ascendantwiki.model.Ability;
import com.raedn.ascendantwiki.model.Loadout;
import com.raedn.ascendantwiki.model.Perk;
import com.raedn.ascendantwiki.service.UserService;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoadoutDTO {
    private Long id;
    private String name;
    private String username;
    private Ability ability;
    private Perk combatPerk1;
    private Perk combatPerk2;
    private Perk utilityPerk1;
    private Perk utilityPerk2;


    public static LoadoutDTO fromEntity(Loadout loadout) {
        if (loadout == null) return null;
        
        LoadoutDTO dto = new LoadoutDTO();
        dto.setId(loadout.getId());
        dto.setName(loadout.getName());
        dto.setUsername(loadout.getUser().getUsername());
        dto.setAbility(loadout.getAbility());
        dto.setCombatPerk1(loadout.getCombatPerk1());
        dto.setCombatPerk2(loadout.getCombatPerk2());
        dto.setUtilityPerk1(loadout.getUtilityPerk1());
        dto.setUtilityPerk2(loadout.getUtilityPerk2());
        return dto;
    }

    public Loadout toEntity(UserService userService) {
        Loadout loadout = new Loadout();
        loadout.setId(this.id);
        loadout.setName(this.name);
        if (this.username != null) {
            loadout.setUser(userService.getUserByUsername(this.username));
        }
        if (this.ability != null) {
            loadout.setAbility(this.ability);
        }
        if (this.combatPerk1 != null) {
            loadout.setCombatPerk1(this.combatPerk1);
        }
        if (this.combatPerk2 != null) {
            loadout.setCombatPerk2(this.combatPerk2);
        }
        if (this.utilityPerk1 != null) {
            loadout.setUtilityPerk1(this.utilityPerk1);
        }
        if (this.utilityPerk2 != null) {
            loadout.setUtilityPerk2(this.utilityPerk2);
        }
        return loadout;
    }
}