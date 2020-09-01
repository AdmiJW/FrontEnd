/* ======================================================================
    BASIC DATATYPES IN SQL

    >   INT                     (Whole Numbers)
    >   DECIMAL(M,N)            (M - total digits including D.P,
                                 N - total digits in D.P
                                Eg: 12.451 shall be DECIMAL(5,3) )
    >   VARCHAR(L)              (String of length L)
    >   BLOB                    (Binary Large Object - Data)
    >   DATE                    (YYYY-MM-DD)
    >   TIMESTAMP               (YYYY-MM-DD HH:MM:SS)
====================================================================== */




#   CREATING TABLE
/* ======================================================================

    To create tables, use the following format:

    CREATE TABLE <table_name> (
        <field_name> <data_type> <constraints>
        <field_name> <data_type> <constraints>
        .
        .
        .
    );

    where the constraints are Optional.

    
====================================================================== */

CREATE TABLE students (
    student_id INT,
    student_name VARCHAR(50),
    age INT
);


#   OBSERVING DETAILS OF TABLE
/* ======================================================================
    We easily Observe the table using DESCRIBE <table>
 ====================================================================== */
DESCRIBE students;





#   DELETING/ DROPPING TABLE
/* ======================================================================
    We call deleting a table to be DROPPING a table, which is done by

        DROP TABLE <table>
====================================================================== */
DROP TABLE students;




#   MODIFYING A TABLE
/* ======================================================================
    >   We could add a new column to a table

        ALTER TABLE <table> ADD <field_name> <data_type> <constraints>

    >   We could change the properties of a column of a table

        ALTER TABLE <table> MODIFY COLUMN <field_name> <data_type> <constraints>

    >   We could of course, drop a column from a table

        ALTER TABLE <table> DROP COLUMN <field_name>

====================================================================== */

ALTER TABLE students ADD gpa DECIMAL(3,2) NOT NULL;

ALTER TABLE students MODIFY COLUMN gpa DECIMAL(4,2);    # Will remove NOT NULL

ALTER TABLE students DROP COLUMN gpa;
