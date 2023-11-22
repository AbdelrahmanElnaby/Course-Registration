CREATE TABLE course_classes
    (course_id INTEGER REFERENCES courses(id),
     short_name VARCHAR(1),
     max_students SMALLINT ,
     PRIMARY KEY (course_id, short_name ) );
