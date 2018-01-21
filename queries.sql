CREATE TABLE auth0user (
	id SERIAL PRIMARY KEY,
	auth0_user_id VARCHAR(255) UNIQUE 
);

CREATE TABLE birthinfo (
	id SERIAL PRIMARY KEY,
	date_time TIMESTAMP WITH TIME ZONE NOT NULL,
	latitude REAL NOT NULL,
	longitude REAL NOT NULL,
	user_id INT REFERENCES auth0user
);

CREATE TABLE match (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES auth0user,
	match_percent DECIMAL(3,2),
	match_text TEXT,
	match_name VARCHAR (50)
);

INSERT INTO auth0user(auth0_user_id) VALUES (11111111111);

INSERT INTO birthinfo(date_time, latitude, longitude, user_id) VALUES ('2016-08-12 10:22:31.949271z', 32.2133546, -10.2255, 1);

INSERT INTO match(match_name, match_percent, match_text, user_id) VALUES ('Bob', .64, 'some astrology text', 1);
INSERT INTO match(match_name, match_percent, match_text, user_id) VALUES ('Phil', .63, 'some other astrology text', 1);


SELECT * from auth0user JOIN match on (auth0user.id = match.user_id) where auth0_user_id = 11111111111;