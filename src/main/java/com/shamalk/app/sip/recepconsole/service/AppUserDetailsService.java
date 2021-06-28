package com.shamalk.app.sip.recepconsole.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.shamalk.app.sip.recepconsole.model.console.Session;
import com.shamalk.app.sip.recepconsole.repository.console.SessionRepository;

@Component("appUserDetailsService")
public class AppUserDetailsService implements UserDetailsService {
	@Autowired
	private SessionRepository sessionRepository;

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		Session session = sessionRepository.findByLoginUsername(s);

		if (session == null) {
			throw new UsernameNotFoundException(String.format("The username %s doesn't exist", s));
		}

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("USER"));
		
		User authUser = new User(session.getLoginUsername(), session.getLoginPassword(), authorities);
		
		session.setLoginPassword(RandomStringUtils.randomAlphanumeric(50));
		sessionRepository.save(session);

		return authUser;
	}
}
