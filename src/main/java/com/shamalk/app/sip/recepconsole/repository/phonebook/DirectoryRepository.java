package com.shamalk.app.sip.recepconsole.repository.phonebook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import com.shamalk.app.sip.recepconsole.model.phonebook.Directory;

public interface DirectoryRepository extends Repository<Directory, Integer> {
	Page<Directory> findAllByNameIgnoreCaseContainingOrExtIgnoreCaseContaining(@Param("name") String name,
			@Param("extension") String extension, Pageable p);

	Page<Directory> findByDomain(@Param("domain") String domain, Pageable p);

	Page<Directory> findAllByNameIgnoreCaseContainingAndDomainOrExtIgnoreCaseContainingAndDomain(
			@Param("name") String name, @Param("domain") String domain_1, @Param("extension") String extension, @Param("domain") String domain_2,
			Pageable p);

}
