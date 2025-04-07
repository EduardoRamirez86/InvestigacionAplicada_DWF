package sv.edu.udb.InvestigacionDwf.service.impl;

import java.util.Collections;

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

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public String register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new UserAlreadyExistException("El usuario ya existe");
        }

        // Assign default role (ROLE_USER)
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol ROLE_USER no encontrado"));

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        // Generate JWT token for the new user
        return jwtUtils.generateToken(user.getUsername(), "ROLE_USER");
    }

    @Override
    public String login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        // Generate JWT token
        return jwtUtils.generateToken(user.getUsername(), user.getRoles().iterator().next().getName());
    }
}
