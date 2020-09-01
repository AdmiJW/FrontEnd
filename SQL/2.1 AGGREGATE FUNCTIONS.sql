/* =================================================================================

    Some of the common Aggregate Functions are:
        >   MAX
        >   MIN
        >   COUNT       (Count NON NULL values)
        >   AVG
        >   SUM

    Notice that Aggregate functions cannot work well together with WHERE if we
    want the aggregate function to act on certain rows only.

    THerefore, there are some useful keywords:
        >   GROUP BY
        >   HAVING

    _______________________________________________________________________________

    GROUP BY will essentially group the selected column's duplicate values into
    one group.
    For example, maybe we want to count number of employees based on their gender, then
    we would do GROUP BY sex

    _______________________________________________________________________________

    When we want to filter the aggregate function results, we don't use the WHERE
    keyword. Instead, we use HAVING

    Let's say we want to count people having certain ages, but only those above 18, we would do
    GROUP BY age
    However, we can't use WHERE COUNT(age) > 18 here, instead, use
    HAVING COUNT(age) > 18

================================================================================= */




--  BASIC FUNCTIONS ======================================

--  Find number of Employees
SELECT COUNT(emp_id)
FROM Employee;


--  Find number of Employees having a Supervisor (NOT NULL in super_id)
SELECT COUNT(super_id)
FROM Employee;


--  Find number of FEMALE employee which is born at or after 1970
SELECT COUNT(*)
FROM Employee
WHERE 
    sex = 'F'
    AND birth_date >= '1970-01-01';



--  Find average of Male Employee salaries. Use FORMAT(data, precision)
SELECT FORMAT( AVG(salary), 2 )
FROM Employee
WHERE sex = 'M';



--  Find sum of Female Employee salaries.
SELECT SUM(salary)
FROM Employee
WHERE sex = 'F';


-- AGGREGATE FUNCTIONS =====================================

--  Find out Number of Males and Females
SELECT sex, COUNT(*)
FROM Employee
GROUP BY sex;


--  Find out total sales of each salesman (Group by emp_id)
SELECT emp_id, SUM(total_sales)
FROM Works_With
GROUP BY emp_id;



--  Find out total sales of each salesman. ONLY if sales are 
--  greater than Average of the total sales
SELECT emp_id, SUM(total_sales)
FROM Works_With
GROUP BY emp_id
HAVING SUM(total_sales) >= (
    SELECT AVG(total_sales)
    FROM Works_With
);