--  This section will use a predefined table Student_Info
--  See >> 1.A Student_Info Table


#    QUERYING DATA
/* ======================================================================
    
    The most basic form to select and display all the datas would be:

        SELECT * FROM <table>

    The * means a wildcard, which selects all the columns

    ___________________________________________________________________

    To select only specific fields from the table, we can specify them
    seperated by commas

        SELECT <field_1>, <field_2>... FROM <table>

    ___________________________________________________________________

    To select the rows with filtering conditions, we use

        SELECT * FROM <table>
        WHERE <condition>

    ____________________________________________________________________

    To select the rows and Order them Ascending or Descending, we can use:

        SELECT * FROM <table>
        ORDER BY <field_1> <DESC/ASC>, <field_2> <DESC/ASC>

    Where it will order by field_1 lexicographically. Only if the field_1
    has exact same values then it will order by field_2

    We can put optionally DESC or ASC to specify Ascending or Descending
    order. By default it is ASC

    _____________________________________________________________________

    We can limit the rows returned using LIMIT keyword

        SELECT * FROM <table>
        ORDER BY <field_1>
        LIMIT 2

    which limits the rows returned to only 2 results

    ______________________________________________________________________

    If we don't want to have duplicate values in a certain field, use
    DISTINCT keyword

        SELECT DISTINCT <field_1>, <field_2> FROM <table>

    which field_1 will not show duplicate values. Only the first encounter
    will be returned

 ====================================================================== */




-->>  VIEW THE WHOLE TABLE 
SELECT * FROM Student_Info;



-->>  SELECTING SPECIFIC COLUMNS FROM TABLE
SELECT CONCAT(title, '. ', first_name, ' ', last_name) AS 'Name',
gender, date_of_birth
FROM Student_Info;



--  SELECTING WITH FILTERING
-->>  Select All the Males
SELECT CONCAT(title, '. ', first_name, ' ', last_name) AS 'Name'
FROM Student_Info
WHERE gender = 'M';




--  SELECTING WITH ORDERING
-->>  Select the names of students ordered by their first name
SELECT CONCAT(title, '. ', first_name, ' ', last_name) AS 'Name'
FROM Student_Info
ORDER BY first_name ASC;




--  SELECTING WITH ORDERING AND LIMITING
-->>  Select the top 3 oldest student. Remember we don't want NULL values!
SELECT CONCAT(title, '. ', first_name, ' ', last_name) AS 'Name',
date_of_birth
FROM Student_Info
WHERE date_of_birth IS NOT NULL
ORDER BY date_of_birth ASC
LIMIT 3;




