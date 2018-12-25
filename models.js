const { sequelize, Sequelize } = require('./connection');
const user = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// force: true will drop the table if it already exists
user.sync();
(async () => {
    try {
        await sequelize.transaction(async (t) => {
            await user.create({
                firstName: 'Oop',
                lastName: 'Node'
            }, { transaction: t })
            /* await user.update(
                 { firstName: 'Java' },
                 {
                     where: {
                         lastName: 'Node'
                     }
                 }, { transaction: t })*/

            await user.destroy({
                where: {
                    firstName: 'Java'
                }
            }, { transaction: t })
        })
    }
    catch (err) {
        console.log(err)
        throw new Error();
    }

    // Woops, the query was successful but we still want to roll back!

})();
