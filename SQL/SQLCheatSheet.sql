--SQL CHEAT SHEET

/*
    SQL stands for Structured Query Language
    It is the standard language for storing, manipulating and retrieving data
    in databases.

    SQL may vary a bit based on the database systems used, like:
        >   MySQL
        >   SQL Server
        >   MS Access
        >   Oracle
        >   Postgres
        >   SQLite
*/

---------------------------------------------------------------------
----------------CREATING, DELETING A DATABASE------------------------
---------------------------------------------------------------------

/*
    We create new databases and delete them using:

        CREATE DATABASE <dbname>
        DROP DATABASE   <dbname>
*/

CREATE DATABASE Company;
DROP DATABASE Company;

---------------------------------------------------------------------
----------------CREATING, DELETING A TABLE---------------------------
---------------------------------------------------------------------

/*
    We create new tables and delete them using:

        CREATE TABLE <tablename> (
            <fieldname> <type> <constraints>?
            <fieldname> <type> <constraints>?
            .
            .
        );

        DROP TABLE <tablename>; 

    Where the constraints can be following:
        >   NOT NULL        (No Null value allowed)
        >   UNIQUE          (No duplicate values)
        >   PRIMARY KEY     (Combination of NOT NULL + UNIQUE)
        >   FOREIGN KEY     (Primary key of another table)
        >   CHECK           (All values in column must satisfy specific condition)
        >   DEFAULT         (Default value)
        >   INDEX           (Create indexing on the field, so it can be retrieved quickly)
        >   AUTO_INCREMENT  

*/

CREATE TABLE Employee (
    id int PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    age int NOT NULL,
    salary int NOT NULL,

    CHECK (age >= 18)
);

DROP TABLE Employee;

---------------------------------------------------------------------
----------------INSERTING, UPDATE AND DELETE DATA--------------------
---------------------------------------------------------------------

/*
    Inserting:
        INSERT INTO <table> <fieldnames>+ VALUES <values>+

    Updating:
        UPDATE <table> SET <field>=<value> WHERE <condition>

    Deleting:
        DELETE FROM <table> WHERE <condition>
*/


INSERT INTO Employee (first_name, last_name, age, salary)
VALUES ('John', 'Smith', 20, 2300);

--(If inserting all the values, we can omit the fieldnames part)

INSERT INTO Employee
VALUES ('John', 'Smith', 20, 2300);


UPDATE Employee
SET salary = salary + 1000
WHERE id = 0;

--(If omit the WHERE clause, it will update all!)


DELETE FROM Employee WHERE id = 0;

--(If omit the WHERE clause, it will delete all!)



---------------------------------------------------------------------
----------------ALTER THE TABLE--------------------------------------
---------------------------------------------------------------------

/*
    We 'alter' the table when we want to
        >   Add columns
        >   Modify the type or constraints of columns
        >   Delete columns

    Use syntax:

        ALTER TABLE <table> ADD <fieldname> <type> <constraints>?
        
        ALTER TABLE <table> MODIFY COLUMN <fieldname> <type>

        ALTER TABLE <table> DROP COLUMN <fieldname>
*/

ALTER TABLE Employee
ADD department varchar(255) NOT NULL;

ALTER TABLE Employee
MODIFY COLUMN city varchar(100);

ALTER TABLE Employee
DROP COLUMN department;


---------------------------------------------------------------------
----------------SELECTING DATA---------------------------------------
---------------------------------------------------------------------

/*
    The main part of SQL is retrieving data, especially based on
    certain constraints

    SELECT <fieldname>+ FROM <table>

    Here are some examples:
        SELECT *                                (* is a wildcard, meaning to
        FROM <table>                            select all columns)
                                                
        SELECT <field>, <field>                 (Select only specified fields)
        FROM <table>
        
        SELECT *                                (Select all rows that satisfy
        FROM <table>                            certain condition)
        WHERE <condition>               
        
        SELECT *                                (Select all rows, in sorted order based)
        FROM <table>                            (on specified field(s) )
        ORDER BY <field>+ <DESC>?               (If DESC, then is in reversed order)

        SELECT DISTINCT <field>                 (Select the specified fields, if it was)
        FROM <table>                            (never returned before)


    Usually, text values need to be enclosed in quotes ( '' ), but numeric values don't (Avoid being store as string)

    We can use AND, OR and NOT operators on the conditions
*/

SELECT * FROM Employee;

SELECT first_name, last_name FROM Employee;

SELECT DISTINCT city FROM Employee
ORDER BY city;

SELECT first_name, last_name FROM Employee
WHERE age < 30;


---------------------------------------------------------------------
----------------SQL OPERATORS----------------------------------------
---------------------------------------------------------------------

/*
    SQL operators are used in conditions to check if data satisfy certain
    conditions

    >   =                       (Equal)
    >   <>                      (Not equal. In some language != also accepted)
    >   >, <, >=, <=            (Greater than, less than and its equal to counterparts)
    >   BETWEEN... AND          (Range, can be string or decimals)                  Eg: age BETWEEN 18 AND 50
    >   LIKE                    (Matching String patterns, see below)
    >   IN                      (Value is inside possible multiple values)          Eg: city IN ('New York', 'London')
    >   IS NULL/ IS NOT NULL    (Check if value is NULL)
    >   IS NOT DISTINCT FROM    (Check two fields value are identical (OR NULL) )   Eg: customer.city IS NOT DISTINCT FROM employee.city
    >   AS                      (Aliases. See later section)

    For LIKE, we can use following patterns:

    >   %                       (Any character, 0 or more in length)            Eg: '%s' find string that end with s
    >   _                       (One character of any)                          Eg: '_s%' find string that second char is s
    >   [ ]                     (Character classes)                             Eg: '[abc]' find either a, b or c only
    >   [ - ]                   (Range of characters)                           Eg: '[a-g]' find alphabet from a to g only

    When we want to escape special characters, we put in an escaping character, then later ESCAPE it

    Let's say we want find string that start with star sign *
    Eg: field LIKE '#*%' ESCAPE '#'                         (Here we assign # as escape prefix. Character directly after # will be escaped)
*/



---------------------------------------------------------------------
----------------INDEXING---------------------------------------------
---------------------------------------------------------------------

/*
    Frequently visited fields should be indexed for efficient retrieving and operating

    CREATE INDEX <indexname> ON <table> <field>+
    DROP INDEX <indexname> ON <table>
*/

CREATE INDEX name_idx ON Employee (
    first_name, last_name
);

DROP INDEX name_idx ON Employee;