package com.shamalk.app.sip.recepconsole.repository.registration;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.Subscriber;

public interface SubscriberRepository extends JpaRepository<Subscriber, Integer> {

	List<Subscriber> findByUsernameAndDomain(@Param("username") String username, @Param("domain") String domain);
}
