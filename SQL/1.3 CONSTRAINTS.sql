#   CONSTRIANTS
/* ======================================================================
    When creating table, we can specify the optional contraints for each
    column / field.

    The constraints are:

    >   NOT NULL                (Ensure the data cannot be blank)
    >   AUTO_INCREMENT          (Apply auto increment, especially on ID)
    >   UNIQUE                  (Ensure the data only has one 
                                 occurrence in whole field)
    >   PRIMARY KEY             (Combination of NOT NULL & UNIQUE. Used to identify
                                 rows)
    >   FOREIGN KEY             (Uniquely identifies another row in another table)
    >   CHECK (Constraints)     (Check the data in each row specifies a specific
                                 condition, like REGEX)
    >   DEFAULT <value>         (If no values are provided, will set default value)
    >   INDEX                   (Creates Index for fast querying)
 ====================================================================== */

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50) NOT NULL,
    age INT DEFAULT 12,
    CHECK (age >= 12),

    major VARCHAR(20)


    #   We can also declare primary key here like so:
    #   PRIMARY KEY( student_id )

);


DESCRIBE students;
