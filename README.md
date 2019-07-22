## System Dependencies

#### PostgreSQL

- install [PostGres](https://www.postgresql.org/download/)
- after install run: `pg_ctl -D /usr/local/var/postgres start && brew services start postgresql`
- from the command line run: `createuser username --createdb` and replace username with a name of your choosing
- from the command line run: `createdb lockup`
- see **config/config.json.example** as an example to create your own config file in **config/config.json**
- In **server/config/config.json** populate the `username`, `password`, and `database` settings with your username, password (if you didn't create or set one when setting up your database leave it as an empty string), and database name

#### Node

- install [Node](nodejs.org), preferably using a version manager such as [nvm](https://github.com/creationix/nvm)

## Database setup

- the database will create all tables in the lockup db when you run `npm run start`
- NOTE: the db is wiped clean after each time the server is started for the purposes of this test and ease of development. In a production environment the `force: true` arguement given to `sync.db()` in **models/index.js** should be removed to stop this

## Scaling Considerations

This app will receive a lot a read request by nature of the fact that we will be polling the api frequently to see if the user has left the house. Firstly when deciding how often to poll we would need to figure out an appropriate latency in the user leaving and receiving the notification (30 seconds, 1 minute?) this will impact performance and traffic greatly. It's also important to note that with each new user we know almost exactly how many request we'll bre adding. As a result we may run into polling issues. This should be mitigated fairly easily by caching user locations and checking from there. In addition I think this app would scale well horizontally because the number of requests that would be coming in is very predictable and thus easy to account for using AWS or which ever service you choose. Lastly I think horizontal scaling is preferable when using Node for redundancy, because if a node app crashes the whole thing goes down rather than failing gracefully. Thus having redundant servers and being able to get them up quickly is a big advantage for this app.
