package com.shamalk.app.sip.recepconsole.repository.console;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shamalk.app.sip.recepconsole.model.console.PresenceEntity;

public interface PresenceEntityRepository extends JpaRepository<PresenceEntity, Long> {

}
