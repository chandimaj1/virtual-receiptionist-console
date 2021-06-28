package com.shamalk.app.sip.recepconsole.repository.registration;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.CallHistoryOut;

public interface CallHistoryOutRepository extends JpaRepository<CallHistoryOut, Integer> {
	Page<CallHistoryOut> findByLocalExtensionNumberAndDomainAndDateAfterAndCalledStationIdIgnoreCaseContaining(
			@Param("local_ext") String localExtensionNumber, @Param("domain") String domain,
			@Param("date") Date date, @Param("search_called_station_id") String calledStationId, Pageable p);

}
