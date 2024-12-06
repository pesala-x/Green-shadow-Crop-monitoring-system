package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignInRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignUpRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.response.JWTAuthResponse;
import lk.ijse.pesalax.cropmonitorapplication.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v0/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
@Slf4j
public class LoginController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        log.info("Sign in successful");
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JWTAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        log.info("Sign up successful");
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }
}
