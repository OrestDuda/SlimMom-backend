# SlimMom-backend

### Documentation [Swagger](https://slim-mom-beckend.herokuapp.com/api-docs)

### Description 
###### Backend for calorie calculation for public and registered users, as well as journal keeping of food consumed with db of food items for registered users.

### Paths

`AUTH`

@ POST /users/registration

@ POST /users/login

@ POST /users/logout

@ GET /users/current - returns current logged user

`JOURNAL`

@ POST /journal - add new food item for given day

@ DELETE /journal/{forDay}/{foodItemId} - delete food item from given day

@ GET /journal/{forDay} - return list of food items for given day for current user

`PUBLIC`

@ PATCH /public - calculates daily limit for not registered user

`CALCULATOR`

@ PATCH /calculator - calculates daily limit for registered user

`CATALOGUE`

@ GET /catalogue - search food name in db per query

@ GET /catalogue/all - get all food catalogue

