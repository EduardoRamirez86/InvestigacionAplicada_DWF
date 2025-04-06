package sv.edu.udb.InvestigacionDwf;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import sv.edu.udb.InvestigacionDwf.model.Role;
import sv.edu.udb.InvestigacionDwf.repository.RoleRepository;

@Component
public class RoleInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @sv.edu.udb.InvestigacionDwf.PostConstruct
    public void init() {
        try {
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
        } catch (Exception e) {
            e.printStackTrace();  // Imprime el error en la consola para mayor detalle
        }
    }
}


