# Init PG Server

-   Enter PSQL App
-   Run command "psql postgres" (to log with specific user run "psql [database_name][user_name]")
-   "create user [user_name] with login password [password];"
-   "create database [database_name] owner [user_name];"
-   "grant all privileges on database [database_name] to [user_name]";

# PG Commands

-   \l - list all databases
-   \du - list all users
-   \dt - List all tables
-   \c [database_name] - connect to a database
-   \q - exit psql connection
