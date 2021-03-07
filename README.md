## Assignment 13: E-commerce Back End
---
### Topic
Object Relational Mapping (ORM)

### User Story (Obtained from the assignment description)

```
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

## My Actions and Notes

* The project was developed from the code base provided in the assignment description page ([link](https://github.com/coding-boot-camp/fantastic-umbrella)).
* Basic considerations were as follows:
    * Following packages were used in the assignment: ```MySQL2```, ```Sequelize``` and ```dotenv``` 
    * The database configuration information was saved in a local ```.env``` file
    * No test files have been added since there was no specific instruction to add test cases
    * The ```db/schema.sql``` file was used to create the database using MySQL shell command
    * Demo data was inserted using a ```npm run seed``` command 
    * Database models and associations were created as instructed in the assignment description. 
    * The Sequelize models were synced before running the server.  


### Demo Run
![Demo Run](./assets/images/assignment13_demo.gif)

### Link of Walkthrough Video
[Click here to see the video](https://drive.google.com/file/d/1iTvvTkOHUni69uoxxFCpF1RsHJNWwP5V/view)
