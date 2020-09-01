#   INSERTING DATA IN ALL FIELDS
/* ======================================================================
    If we are going to insert the data into ALL the fields, we use the
    syntax

        INSERT INTO <table> VALUES ( <...values> )

    where the values are exactly number of columns in the table
 ====================================================================== */

INSERT INTO students VALUES (10, 'Kate', 14);   # Setting ID ourselves will work






#   INSERTING DATA IN SOME FIELDS
/* ======================================================================
    If we only want to fill in some fields and omit some other ones, we
    first put the field names in a parenthesis after the <table>,
    then only follows by VALUES ( <...values> )

        INSERT INTO <table> ( <...fields> ) VALUES ( <...values> )
 ====================================================================== */

 INSERT INTO students ( student_name, age ) VALUES ( 'Cindy', 18 );



 SELECT * FROM students;
