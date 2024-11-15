package lk.ijse.pesalax.cropmonitor_application_backend;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableMethodSecurity
@EnableWebSecurity
public class CropMonitorApplication {

	public static void main(String[] args) {
		SpringApplication.run(CropMonitorApplication.class, args);
	}

	@Bean
	public ModelMapper mapper() {return new ModelMapper();}
}
