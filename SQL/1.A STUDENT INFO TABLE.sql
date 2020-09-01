CREATE TABLE Student_Info (
    student_id INT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(4) NOT NULL,

    last_name VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,

    other_name VARCHAR(20),

    gender VARCHAR(1) NOT NULL,

    date_of_birth DATE,
    place_of_birth VARCHAR(20),

    CHECK ( (title IN ('Miss', 'Mrs', 'Mr') ) ),
    CHECK ( (gender IN ('M','F') ) )
)

-- Please Create the Table first. Executing all at once will cause error

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Miss', 'Adu', 'Christiana', NULL, 'F', '1981/6/30', 'Tema' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Miss', 'Agbeko', 'Mavis', NULL, 'F', NULL, 'Kumasi' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mrs', 'Afrifa', 'Yvette', 'Akosua', 'F', '1987/10/25', 'Accra' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mr', 'Arthur', 'John', 'Kingsley', 'M', '1993/3/14', 'Mankesim' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mr', 'Ofori', 'Amanfo', 'Emmaneul', 'M', '1991/12/1', 'Sefwi Wiaso' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Miss', 'Aidoo', 'Patience', NULL, 'F', '1978/5/15', 'Tarkwa' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Miss', 'Akafia', 'Lawrencia', NULL, 'F', '1980/6/4', 'Accra' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mrs', 'Okoe', 'Theodora', NULL, 'F', '1984/7/14', 'Sandema' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mr', 'Ampofo', 'David', NULL, 'M', NULL, 'Navrongo');

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mr', 'Poku', 'Kwame', 'Nana', 'M', '1984/11/13', 'Tamale' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Miss', 'Opoku', 'Berlinda', NULL, 'F', '1991/9/23', 'Wenchi' );

INSERT INTO Student_Info (title, last_name, first_name, other_name, gender, date_of_birth, place_of_birth )
VALUES ('Mr', 'Danso', 'Prosper', NULL, 'M', '1982/12/10', 'Koforidua' );





SELECT * FROM Student_Info;