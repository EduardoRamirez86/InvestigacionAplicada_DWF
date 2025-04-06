package sv.edu.udb.InvestigacionDwf;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import sv.edu.udb.InvestigacionDwf.model.Role;
import sv.edu.udb.InvestigacionDwf.repository.RoleRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verifica si el rol "ROLE_USER" ya existe
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
        }

        // Verifica si el rol "ROLE_ADMIN" ya existe
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }
    }
}

