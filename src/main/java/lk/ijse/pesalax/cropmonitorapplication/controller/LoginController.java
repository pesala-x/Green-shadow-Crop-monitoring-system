package lk.ijse.pesalax.cropmonitorapplication.controller;

import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignInRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.request.SignUpRequest;
import lk.ijse.pesalax.cropmonitorapplication.auth.response.JWTAuthResponse;
import lk.ijse.pesalax.cropmonitorapplication.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v0/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class LoginController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest){
        System.out.println("Signing in");
        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JWTAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }

    @PostMapping("refresh")
    public ResponseEntity<JWTAuthResponse> refreshToken (@RequestParam ("refreshToken") String refreshToken) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshToken));
    }
}
