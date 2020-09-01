/* =================================================================================

Nested Queries are queries which utilizes multiple SELECT statements

Often, we want to get a very specific result, and that query
needs to use the result of one SELECT statement in another
SELECT statement. That's where Nested Queries come in


================================================================================= */



--  Find names of all employees who have sold over
--  30000 to single client

--  This is selecting employees id sold over 30000 to single client
SELECT DISTINCT emp_id
FROM Works_With
WHERE total_sales >= 30000;

SELECT E.first_name, E.last_name, W.client_id, W.total_sales
FROM Employee AS E
INNER JOIN Works_With AS W
ON E.emp_id = W.emp_id
WHERE E.emp_id IN (
    SELECT DISTINCT emp_id
    FROM Works_With
    WHERE total_sales >= 30000
);






--  Find all clients who are handled by the branch that
--  Michael Scott manages

--  First, get Michael Scott's ID
SELECT emp_id
FROM Employee
WHERE first_name = 'Michael' AND last_name = 'Scott';

--  Then, get the branch id that is handled by Michael Scott
SELECT branch_id
FROM Branch
WHERE mgr_id = (
    SELECT emp_id
    FROM Employee
    WHERE first_name = 'Michael' AND last_name = 'Scott'
);


--  Lastly, get all clients associated with Branch id
SELECT client_id, client_name
FROM Client 
WHERE branch_id = (
    SELECT branch_id
    FROM Branch
    WHERE mgr_id = (
        SELECT emp_id
        FROM Employee
        WHERE first_name = 'Michael' AND last_name = 'Scott'
    )
);