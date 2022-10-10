'use strict'

const dbdiff = require('dbdiff')
Array.prototype.createConnectionPair = function () {
    const connection = this
    const fromConnection = connection.find(e => e.type === "from")
    const withConnection = connection.filter(e => e.type === "with")
    return withConnection.map(e => {
        return [fromConnection, e]
    })
}

Array.prototype.performQuery = async function () {
    const diff = new dbdiff.DbDiff()
    let difference = {}
    await Promise.all(this.map(async e => {
        const From = e.find(e => e.type === "from")
        const With = e.find(e => e.type === "with")
        const fromConenction = {
            dialect: 'mysql',
            username: From.username,
            password: From.password,
            database: From.dbname,
            host: From.hostname,
            dialectOptions: {
                ssl: false
            }
        }
        const withConenction = {
            dialect: 'mysql',
            username: With.username,
            password: With.password,
            database: With.dbname,
            host: With.hostname,
            dialectOptions: {
                ssl: false
            }
        }

        await diff.compare([fromConenction, withConenction])
        let response = diff.commands('drop')
        difference[With.dbname] = response.split("\n\n")
    }))

    return difference
}