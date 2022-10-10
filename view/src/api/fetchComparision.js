const fetchComparition = async () => {
    const jsonbody = JSON.stringify([
        {
            "id": 1,
            "hostname": "localhost",
            "type": "from",
            "username": "root",
            "password": "",
            "dbname": "autofikar"
        },
        {
            "id": 2,
            "hostname": "localhost",
            "username": "root",
            "type": "with",
            "password": "",
            "dbname": "autofikar_2"
        },
        {
            "id": 3,
            "hostname": "localhost",
            "username": "root",
            "type": "with",
            "password": "",
            "dbname": "autofikar_3"
        },
        {
            "id": 4,
            "hostname": "localhost",
            "username": "root",
            "type": "with",
            "password": "",
            "dbname": "autofikar_4"
        }
    ])

    const response = await fetch('http://127.0.0.1:3000/api/execute', {
        method: "POST",
        body: jsonbody,
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export default fetchComparition