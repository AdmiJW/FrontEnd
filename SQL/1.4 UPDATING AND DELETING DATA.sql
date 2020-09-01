#   OPERATORS
/* ======================================================================

    We shall use operators for comparison:
        
        >   =                               (Equal to)
        >   <>                              (Not equal to)
        >   >                               (Greater than)
        >   <                               (Less than)
        >   >=                              (Greater or equal to)
        >   <=                              (Lesser or equal to)
        >   BETWEEN <val> AND <val>         (Between (inclusively) two values
                                             can be number or strings)
        >   LIKE                            (Used for pattern and searches)
        >   IN <values>                     (Equal to one of multiple possible
                                             values)
        >   IS                              (Usually used to compare to NULL
                                             IS NULL)
        >   IS NOT DISTINCT FROM            (If both field are equal, or both NULL)
        >   AS                              (Changes the field name on presentation)

    
    Eg:
        age BETWEEN 12 AND 18

        city IN ('Berlin', 'Sydney', 'New York')

    
    Pattern Matching Using LIKE:
        >   % is a wildcard character, which matches anything, any length (0 also)
        >   _ is also wildcard, but only 1 character
        >   [] is character class, match any one character in the class
        >   - used in character class represents a range of characters
        >   ! used in character class negates the characters

    Eg:
        a%          matches any string starting with a
        %a          matches any string ending with a
        %a%         matches any string with a in between
        h_t         matches string with one character in between of h and t
        [abc]%      matches any string starting with a, b or c
        [a-z]%      matches any string starting with a-z
        [!0-9]%     matches any string which doesn't start with digit


    To escape a special character, we need to define a prefix character
    which the character following it will be escaped

    Eg:
        LIKE '%\_' ESCAPE '\'

        Here \ is defined as escape character. In the pattern, There is a
        underscore _ followed by escape character \, so that underscore _
        will be escaped 
        So the string matches any string which ends with underscore _

====================================================================== */



#   UPDATING DATA
/* ======================================================================
    Let's say we want to update a specific row of data, or multiple of them
    We will do so with the syntax of 

        UPDATE <table> 
        SET <field> = <value>
        WHERE <condition>

    **  There can be multiple <field> = <value> pairs, just seperate 
        them with a comma

    **  For multiple conditions, use Logical oeprators like AND, OR or NOT

    
    
    **  Remember that without the WHERE clause, all the rows are going
        to be affected!
 ====================================================================== */

SELECT * FROM students;

UPDATE students
SET major = 'Chemistry', age = 13
WHERE student_id = 1 AND student_name LIKE 'C%';






#   DELETING DATA
/* ======================================================================
    To delete rows from the table, we would do:

        DELETE FROM <table> 
        WHERE <condition>

    **  If no WHERE clause was specified, it will delete all the rows!

 ====================================================================== */


 DELETE FROM students
 WHERE student_name LIKE '%y';