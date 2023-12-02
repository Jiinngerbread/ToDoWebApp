CRUD => CREAT READ UPDATE DELEATE

/ = read all tasks 

/ = create (create)  => create a note 

/:uniqueId => read (get) => send note related to the uniqueId

/:uniqueId => update (post/put/patch) => update note related to the uniqueId

/:uniqueId => delete (delete) => delete note related to the uniqueId

Responses can come from multiple sources 
when using react. 
eg: 
axios.post()
fetch.post()
<!-- <form onSubmit={}></form> -->
<!-- <form action={index.js}></form> -->
HTTP Request Methods

GET: Used to retrieve data from the server. This method is the most commonly used HTTP method and is typically used to fetch information from a server without modifying any data.

POST: Used to send data to the server. This method is typically used to submit information or to create a new record to the server.

PUT: Used to update data on the server. This method is used to update an existing resource on the server.

PATCH: Same like put but to update partially.

DELETE: Used to delete data on the server. This method is used to remove a resource from the server.

Put vs Patch

The HTTP PUT and PATCH methods are both used to update resources on a server, but they have different meanings and uses.

PUT: The PUT method is used to update an entire resource on the server.

PATCH: The PATCH method is used to partially update a resource on the server. When you make a PATCH request to a server, you only provide the changes you want to make to the resource, rather than providing the entire representation of the resource.