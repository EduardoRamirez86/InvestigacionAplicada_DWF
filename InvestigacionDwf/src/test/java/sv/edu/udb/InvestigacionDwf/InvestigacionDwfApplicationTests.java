package sv.edu.udb.InvestigacionDwf;  // Asegúrate de que el paquete coincida

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Habilita el perfil "test" para usar application-test.properties
public class InvestigacionDwfApplicationTests {

	@MockBean
	private UserDetailsService userDetailsService; // Mock para seguridad

	@MockBean
	private JwtDecoder jwtDecoder; // Mock para JWT (solo si lo usas)

	@Test
	void contextLoads() {
		// Test vacío que verifica si el contexto de Spring se carga
	}
}