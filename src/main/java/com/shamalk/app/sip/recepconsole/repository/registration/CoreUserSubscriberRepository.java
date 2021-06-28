package com.shamalk.app.sip.recepconsole.repository.registration;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.CoreUserSubscriber;

public interface CoreUserSubscriberRepository extends JpaRepository<CoreUserSubscriber, Integer> {
	List<CoreUserSubscriber> findByDomain(@Param("domain") String domain);
}
