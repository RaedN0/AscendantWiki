package com.raedn.ascendantwiki.model;

import lombok.Data;

@Data
public class RegistrationRequest {
    private String username;
    private String password;
}