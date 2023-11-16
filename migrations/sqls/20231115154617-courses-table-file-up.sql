CREATE TALBE courses
    (id SERIAL PRIMARY KEY,
     code varhcar(5),
     description varchar(100),
     max_classes SMALLINT);