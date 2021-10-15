CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"task" varchar(600),
	"isComplete" BOOLEAN
);