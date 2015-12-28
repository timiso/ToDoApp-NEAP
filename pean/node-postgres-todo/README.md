# ToDoApp-NEAP


Testing CRUD methods with cURL

Create new todo item
curl --data "text=test&complete=false" http://127.0.0.1:13000/api/v1/todos
curl --data "text=test&complete2=false" http://127.0.0.1:13000/api/v1/todos
curl --data "text=test&complete3=false" http://127.0.0.1:13000/api/v1/todos

Read all todo items:
curl http://127.0.0.1:13000/api/v1/todos

Update an existing todo item:
curl -X PUT --data "text=test&complete=true" http://127.0.0.1:13000/api/v1/todos/1

Delete an existing todo item:
curl -X DELETE http://127.0.0.1:13000/api/v1/todos/3