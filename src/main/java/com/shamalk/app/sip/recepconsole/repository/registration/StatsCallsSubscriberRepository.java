package com.shamalk.app.sip.recepconsole.repository.registration;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.StatsCallsSubscriber;

public interface StatsCallsSubscriberRepository extends JpaRepository<StatsCallsSubscriber, Integer> {
	Page<StatsCallsSubscriber> findByCalledStationIdIn(@Param("user_name_ddi") List<String> userNameDDI, Pageable p);

	Page<StatsCallsSubscriber> findByCalledStationIdInAndDateAfter(@Param("user_name_ddi") List<String> userNameDDI,
			@Param("date_after") Date dateAfter, Pageable p);

	Page<StatsCallsSubscriber> findByCallingStationIdIn(@Param("user_name_ddi") List<String> userNameDDI, Pageable p);

	Page<StatsCallsSubscriber> findByCallingStationIdInAndDateAfter(@Param("user_name_ddi") List<String> userNameDDI,
			@Param("date_after") Date dateAfter, Pageable p);
}
