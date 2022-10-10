'use strict'
function regexOperation(params) {
    const WholeQuery = params
    let table_columns = WholeQuery.match(/([?=`](\w+)[?=`])/gi)
    table_columns = [].concat.apply([], table_columns.map(e => e.match(/\w+/g)))
    let type = WholeQuery.match(/\bDROP|ADD|MODIFY|CREATE\b/g)
    return { tableName: table_columns[0], columnName: table_columns[1], modifyType: type[0] }
}

module.exports = {
    regexOperation
}