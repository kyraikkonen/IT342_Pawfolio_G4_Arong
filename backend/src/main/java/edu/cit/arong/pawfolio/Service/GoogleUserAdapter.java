package edu.cit.arong.pawfolio.Service;

import java.util.Map;

public class GoogleUserAdapter implements OAuthUserAdapter {

    private final Map<String, Object> attributes;

    public GoogleUserAdapter(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    @Override
    public String getEmail(){
        return (String) attributes.get("email");
    }

    @Override
    public String getName(){
        return (String) attributes.get("name");
    }
}