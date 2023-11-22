CREATE TABLE course_class_teachers
    (course_id INTEGER REFERENCES courses(id),
     class_name VARCHAR(1) , 
     teacher_id INTEGER REFERENCES teachers(id), 
     course_type VARCHAR(7), 
     course_dt DATE , 
     PRIMARY KEY(course_id, class_name, teacher_id));
	 
	