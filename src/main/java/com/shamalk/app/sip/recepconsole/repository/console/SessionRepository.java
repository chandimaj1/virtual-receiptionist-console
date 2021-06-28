package com.shamalk.app.sip.recepconsole.repository.console;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RestResource;

import com.shamalk.app.sip.recepconsole.model.console.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {
	@RestResource(exported = false)
	Session findByLoginUsername(String loginUsername);

	@Query("select s from Session s where s.loginUsername = ?#{principal}")
	Session getCurrentSession();
}
