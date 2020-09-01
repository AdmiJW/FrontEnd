/* ============================================================================
    
    When dealing with complex databases which the tables has
    foreign keys connected to another table, we create them
    in a kind of different fashion

    Until that table already have the entry itself, we can't really
    set the foreign key in an entry just yet. We shall set it as NULL
    first

    _____________________________________________________________________

    We set the foreign key in the CREATE TABLE by using syntax:

        FOREIGN KEY ( <field> )
        REFERENCES <table> ( <field> )
        ON DELETE SET NULL

    ______________________________________________________________________

    Since we can't really set a column as foreign key until the table itself
    has been created, we ALTER the table, selecting the column to change as
    foreign key column by following:

        ALTER TABLE <table>
        ADD FOREIGN KEY ( <field> )
        REFERENCES <table> ( <field> )
        ON DELETE SET NULL

    ________________________________________________________________________

    We might have composite primary keys, where the primary keys are foreign
    key combinations.
    In that case, we set up as follows:

    PRIMARY KEY ( <field1>, <field2> ),
    FOREIGN KEY ( <field> )
    REFERENCES <table> ( <field> ) ON DELETE CASCADE,
    FOREIGN KEY ( <field> )
    REFERENCES <table> ( <field> ) ON DELETE CASCADE

============================================================================ */

-- TABLE SOURCE: https://www.mikedane.com/databases/sql/company-database.pdf





--  CREATING EMPLOYEE TABLE, DON'T SET FOREIGN KEYS FIRST
CREATE TABLE Employee(
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    birth_date DATE,
    sex VARCHAR(1),
    salary INT,
    super_id INT,
    branch_id INT,

    CHECK (sex IN ('M','F') )
);

--  CREATING BRANCH TABLE, DON'T SET FOREIGN KEYS FIRST
CREATE TABLE Branch (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(40),
    mgr_id INT,
    mgr_start_date DATE
);

--  CREATING CLIENT TABLE, DONT SET FOREIGN KEYS FIRST
CREATE TABLE Client (
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(40) NOT NULL,
    branch_id INT
);

--  CREATING WORKS_WITH TABLE, DON'T SET FOREIGN KEYS FIRST
CREATE TABLE Works_With (
    emp_id INT,
    client_id INT,
    total_sales INT NOT NULL
);

--  CREATING BRANCH SUPPLIER TABLE, DON'T SET FOREIGN KEYS FIRST
CREATE TABLE Branch_Supplier (
    branch_id INT,
    supplier_name VARCHAR(40),
    supply_type VARCHAR(40)
);



--==========================================================================

--  SETTING THE COLUMNS TO BE FOREIGN KEYS, SINCE THE TABLES ARE SET UP

ALTER TABLE Employee
ADD FOREIGN KEY ( super_id )
REFERENCES Employee( emp_id )
ON DELETE SET NULL;

ALTER TABLE Employee
ADD FOREIGN KEY ( branch_id )
REFERENCES Branch( branch_id )
ON DELETE SET NULL;

ALTER TABLE Branch
ADD FOREIGN KEY ( mgr_id )
REFERENCES Employee( emp_id )
ON DELETE SET NULL;

ALTER TABLE Client
ADD FOREIGN KEY ( branch_id )
REFERENCES Branch( branch_id )
ON DELETE SET NULL;

ALTER TABLE Works_With
ADD PRIMARY KEY( emp_id, client_id );

ALTER TABLE Works_With
ADD FOREIGN KEY( emp_id )
REFERENCES Employee( emp_id )
ON DELETE CASCADE;

ALTER TABLE Works_With
ADD FOREIGN KEY (client_id )
REFERENCES Client( client_id )
ON DELETE CASCADE;

ALTER TABLE Branch_Supplier
ADD PRIMARY KEY( branch_id, supplier_name );

ALTER TABLE Branch_Supplier
ADD FOREIGN KEY( branch_id )
REFERENCES Branch( branch_id )
ON DELETE CASCADE;


DESCRIBE Employee;
DESCRIBE Branch;
DESCRIBE Client;
DESCRIBE Works_With;
DESCRIBE Branch_Supplier;



--===========================================================================

--Adding Entries Without Foreign key

-- Since we can't really add entries until that foreign key entry already exist,
-- We shall set the foreign keys to be NULL first

INSERT INTO Employee (emp_id, first_name, last_name, birth_date, sex, salary)
VALUES ('100', 'David', 'Wallace', '1967/11/17', 'M', 250000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Jan', 'Levinson', '1961/05/11', 'F', 110000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Michael', 'Scott', '1964/03/15', 'M', 75000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Angela', 'Martin', '1971/06/25', 'F', 63000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Kelly', 'Kapoor', '1980/02/05', 'F', 55000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Stanley', 'Hudson', '1958/02/19', 'M', 69000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Josh', 'Porter', '1969/09/05', 'M', 78000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Andy', 'Bernard', '1973/07/22', 'M', 65000);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary)
VALUES ('Jim', 'Halpert', '1978/10/01', 'M', 71000);




INSERT INTO Branch (branch_name, mgr_start_date)
VALUES ('Corporate', '2006/02/09');

INSERT INTO Branch (branch_name, mgr_start_date)
VALUES ('Scranton', '1992/04/06');

INSERT INTO Branch (branch_name, mgr_start_date)
VALUES ('Stamford', '1998/02/13');

INSERT INTO Branch (branch_name)
VALUES ("Buffalo");





INSERT INTO Client (client_id, client_name)
VALUES ( 400, 'Dunmore Highschool');

INSERT INTO Client (client_name)
VALUES ('Lackawana Country');

INSERT INTO Client (client_name)
VALUES ('FedEx');

INSERT INTO Client (client_name)
VALUES ('John Daly Law, LLC');

INSERT INTO Client (client_name)
VALUES ('Scranton Whitepages');

INSERT INTO Client (client_name)
VALUES ('Times Newspaper');

INSERT INTO Client (client_name)
VALUES ('FedEx');


--===========================================================================

--Updating Tables on their Foreign Key

UPDATE Employee
SET super_id = 100
WHERE emp_id IN (101, 102, 106);

UPDATE Employee
SET super_id = 102
WHERE emp_id IN (103, 104, 105);

UPDATE Employee
SET super_id = 106
WHERE emp_id IN (107, 108);

UPDATE Employee
SET branch_id = 1
WHERE emp_id IN (100, 101);

UPDATE Employee
SET branch_id = 2
WHERE emp_id IN (102, 103, 104, 105);

UPDATE Employee
SET branch_id = 3
WHERE emp_id IN (106, 107, 108);




UPDATE Branch
SET mgr_id = 100
WHERE branch_id = 1;

UPDATE Branch
SET mgr_id = 102
WHERE branch_id = 2;

UPDATE Branch
SET mgr_id = 106
WHERE branch_id = 3;



UPDATE Client
SET branch_id = 2
WHERE client_id IN (400, 401, 404, 406);

UPDATE Client
SET branch_id = 3
WHERE client_id IN (402, 403, 405);



--==================================================================

--  Lastly, fill in the Tables with Composite Primary Keys

INSERT INTO Works_With
VALUES (105, 400, 55000);

INSERT INTO Works_With
VALUES (102, 401, 267000);

INSERT INTO Works_With
VALUES (108, 402, 22500);

INSERT INTO Works_With
VALUES (107, 403, 5000);

INSERT INTO Works_With
VALUES (108, 403, 12000);

INSERT INTO Works_With
VALUES (105, 404, 33000);

INSERT INTO Works_With
VALUES (107, 405, 26000);

INSERT INTO Works_With
VALUES (102, 406, 15000);

INSERT INTO Works_With
VALUES (105, 406, 130000);





INSERT INTO Branch_Supplier
VALUES (2, 'Hammer Mill', 'Paper');

INSERT INTO Branch_Supplier
VALUES (2, 'Uni-ball', 'Writing Utensils');

INSERT INTO Branch_Supplier
VALUES (3, 'Patriot Paper', 'Paper');

INSERT INTO Branch_Supplier
VALUES (2, 'J.T. Forms & Labels', 'Custom Forms');

INSERT INTO Branch_Supplier
VALUES (3, 'Uni-ball', 'Writing Utensils');

INSERT INTO Branch_Supplier
VALUES (3, 'Hammer Mill', 'Paper');

INSERT INTO Branch_Supplier
VALUES (3, 'Stamford Lables', 'Custom Forms');



