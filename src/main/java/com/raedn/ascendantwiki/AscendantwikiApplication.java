package com.raedn.ascendantwiki;

import com.raedn.ascendantwiki.config.FrontendConfigurationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(FrontendConfigurationProperties.class)
public class AscendantwikiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AscendantwikiApplication.class, args);
	}

}
