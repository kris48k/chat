There are two parts of the application:

- Api server: it allows to add messages and get the list of messages;
- Web Application: it serves frontend logic.

# Api server

I use lightweight SpringBoot framework, as my API server doesn't have any special logic.
It has only one controller and two endpoints: for sending messages and retrieving a list of actual messages.
As it's not required, I simplified work with data, and instead of dealing with database, I keep all messages in memory.
We have a simple entity class `Message`, and a list of such messages as a simple data source.
As a building tool I use Maven wrapper.
To compile changed code, use `./mvnw clean install`.
To run the server, use `./mvnw spring-boot:run`.


