package com.hopemeds.auth.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI hopemedsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hopemeds Authentication Service API")
                        .description("API documentation for Hopemeds Authentication and Authorization Microservice")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Hopemeds Support")
                                .email("support@hopemeds.com")
                                .url("https://hopemeds.netlify.app"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("Hopemeds Wiki Documentation")
                        .url("https://www.hopemeds.com/docs"));
    }
}