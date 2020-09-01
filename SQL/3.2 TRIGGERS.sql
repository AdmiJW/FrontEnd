/* =================================================================================

Triggers are like functions that are triggered automatically
everytime when rows get Inserted, Updated or Deleted on a 
table which trigger are set on.


Since setting up of trigger requires changing of delimiter
(Default delimiter: ; ), we need to do this in command line
of SQL, not here PopSQL


Basic Syntax of Trigger:

    DELIMITER $$                (Changing of Delimiter)


    CREATE
        TRIGGER my_trigger BEFORE INSERT
        ON Employee
        FOR EACH ROW BEGIN
            INSERT INTO trigger_table
            VALUES ( NEW.first_name );
    END$$


DELIMITER ;                     (Changing delimiter back to ;)



>   my_trigger is the trigger name
>   BEFORE means the trigger is triggered before the operation
    is done. Can be changed to AFTER
>   INSERT is the type of operation that triggers the trigger.
    Can be INSERT, DELETE, UPDATE etc.
>   Employee is the target table
>   trigger_table is a test table used for logging purposes
>   NEW refers to the new row that we are going to insert



We can also use conditionals in triggers, see:

    ...
    FOR EACH ROW BEGIN
        IF NEW.sex = 'M' THEN
            INSERT INTO trigger_table
            VALUES ('New Male Employee');
        ELSEIF NEW.sex = 'F' THEN
            INSERT INTO trigger_table
            VALUES ('New Female Employee');
        ELSE
            INSERT INTO trigger_table
            VALUES ('New Unspecified Gender Employee');
        END IF;
    END $$



Lastly, to drop a trigger, use

    DROP TRIGGER my_trigger;


================================================================================= */

CREATE TABLE trigger_table (
    message VARCHAR(100)
);



DELIMITER $$

CREATE
    TRIGGER my_trigger BEFORE INSERT
    ON Employee
    FOR EACH ROW BEGIN
        INSERT INTO trigger_table
        VALUES ( CONCAT('Inserted ', NEW.first_name, ' ', NEW.last_name) );
END$$

DELIMITER ;





DELIMITER $$

CREATE
    TRIGGER my_trigger2 BEFORE INSERT
    ON Employee
    FOR EACH ROW BEGIN
        IF NEW.sex = 'F' THEN
            INSERT INTO trigger_table VALUES ('New Female Employee Added');
        ELSEIF NEW.sex = 'M' THEN
            INSERT INTO trigger_table VALUES ('New Male Employee Added');
        ELSE
            INSERT INTO trigger_table VALUES ('New Unspecified Gender Employee Added');
        END IF;
END$$

DELIMITER ;


SELECT * FROM Employee;

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary, super_id, branch_id)
VALUES ('Oscar', 'Martinez', '1968/02/19', 'M', 69000, 106, 3);

INSERT INTO Employee (first_name, last_name, birth_date, sex, salary, super_id, branch_id)
VALUES ('Kevin', 'Malone', '1978/02/19', 'M', 43000, 106, 3);

DELETE FROM Employee
WHERE emp_id IN (109, 110);

SELECT * FROM trigger_table;


DELETE FROM trigger_table;



DROP TRIGGER my_trigger;
DROP TRIGGER my_trigger2;