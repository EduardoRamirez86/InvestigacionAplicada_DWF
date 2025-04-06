package sv.edu.udb.InvestigacionDwf.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Relación uno a muchos entre Role y User
    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<User> users;
}
