package com.shamalk.app.sip.recepconsole.repository.registration;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.ConsoleLocation;

public interface ConsoleLocationRepository extends Repository<ConsoleLocation, String> {
	Page<ConsoleLocation> findByExtNumberAndDomain(@Param("ext_number") String extNumber,
			@Param("domain") String domain, Pageable pageable);

	long countByExtNumberAndDomain(@Param("ext_number") String extNumber, @Param("domain") String domain);
}
