package com.shamalk.app.sip.recepconsole.repository.registration;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.registration.Huntgroup;

public interface HuntgroupRepository extends Repository<Huntgroup, Integer> {
	List<Huntgroup> findByCustomerDomain(@Param("customer_domain") String customerDomain);
}
