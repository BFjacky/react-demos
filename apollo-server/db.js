const r = require('rethinkdb');
let connection;
r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
    if (err) throw err;
    connection = conn;

    // r.table('games').
    //     filter(r.row('id').eq('9f9b0c7a-251f-4c16-b290-28da563ac45d')).delete().run(connection, function (err, result) {
    //         if (err) throw err;
    //         console.log(JSON.stringify(result, null, 2));
    //     });
})

exports.getAllGames = function () {
    return new Promise((resolve, reject) => {
        if (!connection) {
            resolve(`not connect`);
            return;
        }
        r.table('games').run(connection, function (err, cursor) {
            if (err) throw err;
            cursor.toArray(function (err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        });
    })
}

exports.insertGame = function (game) {
    return new Promise((resolve, reject) => {
        if (!connection) {
            resovle(`not connect`);
            return;
        }
        if (!game) {
            resolve(`params invalid`);
            return;
        }
        if (!game.name || !game.price) {
            resolve(`params invalid`);
            return;
        }
        r.table('games').insert([{ name: game.name, price: game.price }]).run(connection, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            resolve(`ok`)
        })
    })
}

