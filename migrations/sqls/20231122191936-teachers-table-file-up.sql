CREATE TABLE teachers 
    (id SERIAL PRIMARY KEY,
     full_name VARCHAR(70), 
     email VARCHAR(35), 
     birth_dt DATE, 
     password varchar(100), 
     max_courses SMALLINT)
	 
	