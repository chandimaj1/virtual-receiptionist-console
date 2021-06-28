package com.shamalk.app.sip.recepconsole.repository.callhistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.shamalk.app.sip.recepconsole.model.callhistory.Call;

public interface CallRepository extends Repository<Call, Integer> {
	@RestResource(path="calls_custom", rel="calls_custom_search")
	Page<Call> findAllByCallingStationIdAndDomainAndDestinationIgnoreCaseContainingOrDestinationAndDomainAndCallingStationIdIgnoreCaseContaining(
			@Param("ext_no") String callingStationId, @Param("domain") String oDomain, @Param("search_text") String sDestination, 
			@Param("ext_no") String destination, @Param("domain") String iDomain, @Param("search_text") String sCallingStationId,
			Pageable p);
}
