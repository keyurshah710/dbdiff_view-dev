'use strict'
const { regexOperation } = require('../helper/functions')
module.exports = async function (req, res) {
    const connection = req.body
    const createConnectionPair = connection.createConnectionPair()
    const response = await createConnectionPair.performQuery()
    let outputResponse = {}
    for (let i in response) {
        outputResponse[i] = {}
        response[i].map(e => {
            if (e !== "") {
                let WholeQuery = e
                let { tableName, columnName, modifyType } = regexOperation(WholeQuery)
                if (typeof outputResponse[i][tableName] === "undefined") {
                    outputResponse[i][tableName] = []
                }
                let query = ""
                    , previous = ""
                    , columns = "-"
                if (modifyType !== "CREATE") {
                    query = WholeQuery.split("\n")
                    previous = query.length > 1 ? query[0] : "-"
                    columns = typeof columnName === "undefined" ? "-" : columnName
                } else {
                    query = WholeQuery.split("\n").join("")
                    previous = "-"
                }
                let tempPrevious = previous.split("--")
                previous = tempPrevious.length > 1 ? tempPrevious[1] : "-"
                let prepareData = {
                    query: typeof query === "string" ? query : query.length > 1 ? query[1] : query[0],
                    previous,
                    modifyType,
                    columns

                }
                outputResponse[i][tableName].push(prepareData)
            }
        })
    }
    return res.status(200).json(outputResponse)
}