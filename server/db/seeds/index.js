exports.seed = function (knex, Promise) {
    return Promise.all([
            knex('drivers').del(),
        ])
        .then(function () {
            return Promise.all([

            ]);
        })
        .catch(function (err) {
            console.log(err)
        });
};