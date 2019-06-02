const { sequelize, User } = require('./models') // you need the connection to the database and Campus model

const seed = async () => {
    try {
        await sequelize.sync() //sync to your database!

        const userA = await User.create({
            name: 'userA',
        })
        const userB = await User.create({
            name: 'userB',
        })
    } catch (err) {
        console.log("----------------------------------");
        console.log("err", err);
        console.log("----------------------------------");

    }


    sequelize.close() //close your db connection else the connection stays alive else your process hangs.
    console.log('Seed Successful!') //Have a prompt to let you know everything is working correctly!
}

seed() //initialize the sync!