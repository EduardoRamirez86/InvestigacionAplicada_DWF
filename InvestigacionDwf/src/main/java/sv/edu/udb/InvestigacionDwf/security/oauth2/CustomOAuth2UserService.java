package sv.edu.udb.InvestigacionDwf.security.oauth2;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        // Lógica para procesar la información del usuario autenticado vía OAuth2
        OAuth2User user = super.loadUser(userRequest);
        // Aquí se pueden mapear los atributos o registrar el usuario en la BD
        return user;
    }
}

