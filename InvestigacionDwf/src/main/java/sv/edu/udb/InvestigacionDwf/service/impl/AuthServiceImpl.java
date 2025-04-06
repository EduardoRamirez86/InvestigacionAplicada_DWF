package sv.edu.udb.InvestigacionDwf.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sv.edu.udb.InvestigacionDwf.dto.LoginRequest;
import sv.edu.udb.InvestigacionDwf.dto.RegisterRequest;
import sv.edu.udb.InvestigacionDwf.exception.UserAlreadyExistException;
import sv.edu.udb.InvestigacionDwf.model.Role;
import sv.edu.udb.InvestigacionDwf.model.User;
import sv.edu.udb.InvestigacionDwf.repository.RoleRepository;
import sv.edu.udb.InvestigacionDwf.repository.UserRepository;
import sv.edu.udb.InvestigacionDwf.security.jwt.JwtUtils;
import sv.edu.udb.InvestigacionDwf.service.AuthService;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager, JwtUtils jwtUtils, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.roleRepository = roleRepository;
    }

    @Override
    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new UserAlreadyExistException("El usuario ya existe");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());

        // Asignar el rol por defecto
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);  // Asignamos el rol de usuario
        user.setRoles(roles);

        userRepository.save(user);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        String roles = String.join(",", authentication.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .toList());
        return jwtUtils.generateToken(authentication.getName(), roles);
    }
}
