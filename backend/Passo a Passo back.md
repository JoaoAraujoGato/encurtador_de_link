# Passo a Passo back

### Utilizando o Knex.js

##### instalando knex:

```
npm install knex sqlite3
```

##### iniciando o código:

```
npx knex init
```

Sera criado um arquivo knexfile.js, mas precisamos configurar esse arquivo para o Knex saber onde esta sendo salvo as tabelas.
Basta substituir essa parte do código

```javascript
development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) =>
        conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
```

##### Criando uma migration: 

```bash
npx knex migrate:make <nome tabela>
```

configurando arquivo gerado

```javascript
exports.up = function (knex){
    return knex.schema.createTable("<nomeTabela>", function (table) {
        table.string("<id>").primary().notNullable();
        table.string("<campo>").notNullable():
        table.string("<nomeCampoDessaTabela>").reference("<nomeCampoTabelaDeReferencia>").inTable("<nomeTabelaReferencia>").onDelete("cascate||setNull||block");
        table.increments("<campo>").notNullable();
        ...
    });
};

exports.down = function (knex) {
	return knex.schema.dropTable("<nomeTabela>");
}
```

Depois de criado todas as tabelas, vamos rodar o seguinte comando:

```bash
npx knex migrate:latest
```

Vai ser gerado um arquivo db.sqlite e para visualizar o banco de dados criado, vamos utilizar o DBeaver e nele vamos criar uma nova conexão e procurar esse arquivo db.sqlite criado

Caso seja preciso alterar as tabelas, vamos rodar:

```bash
npx knex migrate:rollback
```

Depois basta rodar tudo de novo.