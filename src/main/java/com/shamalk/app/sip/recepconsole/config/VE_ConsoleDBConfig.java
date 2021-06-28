package com.shamalk.app.sip.recepconsole.config;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.shamalk.app.sip.recepconsole.model.console.Session;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
		entityManagerFactoryRef = "consoleEntityManager",
		transactionManagerRef = "consoleTransactionManager",
		basePackages = "com.shamalk.app.sip.recepconsole.repository.console"
)
public class VE_ConsoleDBConfig {

	@Bean
	@ConfigurationProperties(prefix = "spring.console.datasource")
	public DataSource consoleDataSource() {
		return DataSourceBuilder
					.create()
					.build();
	}

	@Bean(name = "consoleEntityManager")
	public LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder
					.dataSource(consoleDataSource())
					.properties(hibernateProperties())
					.packages(Session.class)
					.persistenceUnit("consolePU")
					.build();
	}


	@Bean(name = "consoleTransactionManager")
	public PlatformTransactionManager mysqlTransactionManager(@Qualifier("consoleEntityManager") EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}

	private Map<String, ?> hibernateProperties() {

		Resource resource = new ClassPathResource("hibernate.properties");

		try {
			Properties properties = PropertiesLoaderUtils.loadProperties(resource);

			return properties.entrySet().stream()
											.collect(Collectors.toMap(
														e -> e.getKey().toString(),
														e -> e.getValue())
													);
		} catch (IOException e) {
			return new HashMap<String, String>();
		}
	}
}

