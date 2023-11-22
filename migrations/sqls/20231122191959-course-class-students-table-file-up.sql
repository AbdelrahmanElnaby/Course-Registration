CREATE TABLE course_class_students
    (course_id INTEGER REFERENCES courses(id),
     class_name VARCHAR(1) , 
     student_id INTEGER REFERENCES students(id), 
     tatal_grades DECIMAL(5,2), 
     PRIMARY KEY(course_id, class_name, student_id));


	