const { sequelize, Sequelize } = require('./connection');
const user = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
user.sync();
(async () => {
    try {
        await sequelize.transaction(async (t) => {
            return user.create({
                firstName: 'Abraham',
                lastName: 'Lincoln'
            }, { transaction: t })
        })
    }
    catch (err) {
        console.log(err)
        throw new Error();
    }

    // Woops, the query was successful but we still want to roll back!

})();
