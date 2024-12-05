package lk.ijse.pesalax.cropmonitorapplication.service;

import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignInRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignUpRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.response.JWTAuthResponse;

public interface AuthenticationService {
    JWTAuthResponse signIn(SignInRequest signInRequest);

    JWTAuthResponse signUp(SignUpRequest signUpRequest);
}
