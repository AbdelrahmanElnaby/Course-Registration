CREATE TABLE course_classes
    (courseId INTEGER REFERENCES courses(id),
     short_name VARCHAR(1),
     max_students SMALLINT ,
     PRIMARY KEY (courseId, short_name ) );
