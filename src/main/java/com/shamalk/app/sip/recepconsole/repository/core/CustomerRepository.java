package com.shamalk.app.sip.recepconsole.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.core.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	Customer findOneByCompanyDomain(@Param("company_domain") String companyDomain);
}
