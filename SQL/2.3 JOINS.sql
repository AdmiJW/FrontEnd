/* =================================================================================

JOIN are basically combining rows of 2 or more tables into one
based on their related columns ( Usually use foreign keys)

There are 4 types of JOIN:

INNER JOIN ( Same as Intersection of 2 sets )
LEFT JOIN  ( Intersection UNION Left Set )
RIGHT JOIN ( Intersection UNION Right Set )
FULL OUTER JOIN  ( UNION of 2 sets. )

!!!!!! FULL OUTER JOIN IS NOT IMPLEMENTED IN MYSQL !!!!!!!

Remember, the LEFT set here mentioned is the Table that
we mentioned initially, like:

SELECT <field>
FROM TABLEA
INNER JOIN TABLEB
ON TABLEA.fieldA = TABLEB.fieldB;

Here TableA is the Left set, TableB is the right set


================================================================================= */


--  List all branches and name of their managers
SELECT B.branch_name, E.first_name, E.last_name
FROM Branch AS B
INNER JOIN Employee AS E
ON B.mgr_id = E.emp_id;