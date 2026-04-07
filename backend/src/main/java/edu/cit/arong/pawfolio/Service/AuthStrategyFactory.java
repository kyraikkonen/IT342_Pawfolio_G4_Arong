package edu.cit.arong.pawfolio.Service;

import org.springframework.stereotype.Component;

@Component
public class AuthStrategyFactory {

    private final EmailPasswordStrategy emailStrategy;
    private final OAuthStrategy oAuthStrategy;

    public AuthStrategyFactory(EmailPasswordStrategy emailStrategy,
                               OAuthStrategy oAuthStrategy){
        this.emailStrategy = emailStrategy;
        this.oAuthStrategy = oAuthStrategy;
    }

    public AuthStrategy getStrategy(String type){
        switch(type){
            case "EMAIL":
                return emailStrategy;
            case "GOOGLE":
                return oAuthStrategy;
            default:
                throw new IllegalArgumentException("Invalid auth type");
        }
    }
}