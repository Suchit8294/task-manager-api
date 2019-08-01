# task-manager-api
#Following are the URL to access API.
#It uses Authorization header

POST:- https://suchit-task-manager.herokuapp.com/users
body: 
{
"name": "Suchit",
"email":"kumar.suchit8294@gmail.com", //Should be unique
"password":"suhi1234!" //Should be atleast 8 character
}

POST: - https://suchit-task-manager.herokuapp.com/users/login
Body
{
	"email":"john@gmail.com",
	"password":"johndoe"
}

POST:- https://suchit-task-manager.herokuapp.com/users/logout
POST:- https://suchit-task-manager.herokuapp.com/users/logoutAll


POST:- https://suchit-task-manager.herokuapp.com/tasks
Body 
{
"description": "Store in database",
"completed":"false"
}

Get:- https://suchit-task-manager.herokuapp.com/users
Get:- https://suchit-task-manager.herokuapp.com/tasks

Update:- https://suchit-task-manager.herokuapp.com/users/me
body
{
	"name":"john doe"
}

Update:- https://suchit-task-manager.herokuapp.com/tasks
Body 
{
"description": "Store in database",
"completed":"false"
}


Delete:- https://suchit-task-manager.herokuapp.com/users/me
Delete:- https://suchit-task-manager.herokuapp.com/tasks
GET:- https://suchit-task-manager.herokuapp.com/users/me
