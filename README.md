# Receptionist Console based on sip.js and springboot.

#### 1. Database
Setup the database and db user as below. The configuration can be set in `src/main/application.properties` file.
Run the SQL dump receptionist_console.sql to delete existing and import all the related tables.
    
    mysql -u root -p < receptionist_console.sql

    CREATE USER 'receptionist'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON ve_console.* TO 'receptionist'@'localhost';
    GRANT ALL PRIVILEGES ON ve_messaging.* TO 'receptionist'@'localhost';
    GRANT ALL PRIVILEGES ON ve_stats.* TO 'receptionist'@'localhost';
    GRANT ALL PRIVILEGES ON opensips.* TO 'receptionist'@'localhost';
    GRANT ALL PRIVILEGES ON ve_core.* TO 'receptionist'@'localhost';
    FLUSH PRIVILEGES;
    
MILESTONE 5:

    use ve_console;
    ALTER TABLE Session 
		ADD COLUMN login_username VARCHAR(255) NOT NULL,
		ADD COLUMN login_password VARCHAR(255) NOT NULL,
    		ADD CONSTRAINT UQ_Session_login_username UNIQUE (login_username)
    ;
    UPDATE Session SET login_username = id, login_password = 'a' WHERE login_username is NULL;
    INSERT INTO Session (id, isLocked, uri, login_username, login_password) VALUES (99, false, 'CU3TR-3E87D1@35.189.95.175','test.user1', '$2a$04$ZkBdjf2LKTnzy4xftJUD9uLZY/69ARkJTEHSs7oHhNdGGgL7Vlp9W');
##### Session

<pre>
+-----------+--------------+------+-----+---------+----------------+<br />
| Field     | Type         | Null | Key | Default | Extra          |<br />
+-----------+--------------+------+-----+---------+----------------+<br />
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |<br />
| is_locked | bit(1)       | NO   |     | NULL    |                |<br />
| password  | varchar(255) | YES  |     | NULL    |                |<br />
| user_name | varchar(255) | NO   |     | NULL    |                |<br />
+-----------+--------------+------+-----+---------+----------------+<br />
</pre>

##### presence_entity

<pre>
+------------+--------------+------+-----+---------+----------------+<br />
| Field      | Type         | Null | Key | Default | Extra          |<br />
+------------+--------------+------+-----+---------+----------------+<br />
| id         | bigint(20)   | NO   | PRI | NULL    | auto_increment |<br />
| domain     | varchar(255) | YES  |     | NULL    |                |<br />
| user_name  | varchar(255) | NO   |     | NULL    |                |<br />
| session_id | int(11)      | YES  | MUL | NULL    |                |<br />
+------------+--------------+------+-----+---------+----------------+<br />
</pre>

##### Call History and Phone Book
Depending on the existing DB structure. Refer to the Directory.java and Call.java.

#### 2. Running Project

    mvn spring-boot:run

#### 3. REST with JSON
* Add a session 

    curl -k -i -X POST -H "Content-Type:application/json" -d "{\"userName\" : \"user1\", \"isLocked\": \"false\"}" https://localhost:8443/sessions
* Get list of sessions. _(In default case should always get session 1)_
 
    curl -k https://localhost:8443/sessions
* Add 2 Presence Entities

    curl -k -i -X POST -H "Content-Type:application/json" -d "{\"userName\" : \"user2\"}" https://localhost:8443/presenceEntities
    curl -k -i -X POST -H "Content-Type:application/json" -d "{\"userName\" : \"user3\"}" https://localhost:8443/presenceEntities
* Get list of presence entities _(Normally we would not use it. We only need presence entities attached to a session)_

    curl -k https://localhost:8443/presenceEntities
* Attach session 1 to created created Presence Entities
 
    curl -k -i -X PUT -H "Content-Type:text/uri-list" -d "https://localhost:8443/sessions/1" https://localhost:8443/presenceEntities/1/session
    curl -k -i -X PUT -H "Content-Type:text/uri-list" -d "https://localhost:8443/sessions/1" https://localhost:8443/presenceEntities/2/session
* Get list of presense entities attached to session 1

    curl -k https://localhost:8443/sessions/1/presenceEntties
* Remove presence entity 2 from session 1

    curl -k -i -X DELETE https://localhost:8443/presenceEntities/2
* Get list of presense entities attached to session 1 to see if entity 2 is removed

    curl -k https://localhost:8443/sessions/1/presenceEntties
    
* Get list of all the REST API exposed

    curl -k https://localhost:8443/profile
    