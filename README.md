# Préréquis
- Générer un nouvelle app express grace au générateur express (express-cli)
`express nodejs-starter --no-view --git`
- installer les dépendences nécéssaire à la configuration
`npm i --save sequelize mysql2`
- Création d'une nouvelle base de donnée
```shell
mysql -u root -p
mysql > create database my_db_name;
# mysql> create database my_db_name;
# Query OK, 1 row affected (0.00 sec)
mysql > exit
```
# Configuration
## Base de donnée
Si ce n'est pas déjà fait, installer le cli de sequelize
```shell
npm install -g sequelize-cli
```
puis
```shell
sequelize init
# Sequelize CLI [Node: 8.11.3, CLI: 4.1.1, ORM: 4.41.2]

# Created "config/config.json"
# Successfully created models folder at "/nodeProjects/nodejs-starter/models".
# Successfully created migrations folder at "/nodeProjects/nodejs-starter/migrations".
# Successfully created seeders folder at "/nodeProjects/nodejs-starter/seeders".
```
Comme on peut le constater, le sli sequelize nous à généré 3 nouveaux dossiers
```
/config/config.json
/migrations
/seeders
```
Il faut ensuite remplir le fichier `config.json` avec les bonne infos pour la connexion à la base de donnée.
```json
{
  "development": {
    "username": "root",
    "password": "MyRootPassword",
    "database": "my_db_name_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "my_db_name_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "my_db_name_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
