import { Box, Chip, Container, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { blue, green, grey, red, yellow } from "@material-ui/core/colors";
import { StorageOutlined, TableChartOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { fetchComparition } from './api/index';
import './App.css';



function App() {
  const [dataSet, dataState] = useState([])

  async function fetchComparisionData() {
    const data = await fetchComparition()
    let dataList = []
    for (let i in data) {
      let setPrepare = {}
      setPrepare[i] = data[i]
      dataList.push(setPrepare)
    }
    dataState([...dataList])
  }

  useEffect(() => {
    fetchComparisionData()
  }, [])

  function TableHeader() {
    return <TableHead>
      <TableRow>
        <TableCell>
          Columns Name
        </TableCell>
        <TableCell>
          Modify Type
        </TableCell>
        <TableCell>
          Previous
        </TableCell>
        <TableCell>
          Query
        </TableCell>
      </TableRow>
    </TableHead>
  }
  function colorForStatus(status) {
    switch (status) {
      case "DROP":
        return red;
      case "MODIFY":
        return yellow;
      case "ADD":
        return blue;
      case "CREATE":
        return green;
      default:
        return grey;
    }
  }
  return (
    <Container>
      <Box>
        {
          dataSet && dataSet instanceof Array && dataSet.length > 0 ? (
            dataSet.map((data, key) => (
              Object.keys(data).map(db => (
                <Paper key={key} style={{ marginTop: "1rem" }}>
                  <Box p={2}>
                    <Chip
                      icon={<StorageOutlined />}
                      label={db}
                      size="medium"
                      color="primary"
                      variant="default"
                    />
                  </Box>
                  <Divider />
                  <Table>
                    <TableHeader />
                    {
                      Object.keys(data[db]).length > 0 ? (
                        Object.keys(data[db]).map((table, i) => (
                          <TableBody key={i}>
                            <TableRow>
                              <TableCell colSpan={4}>
                                <Chip
                                  icon={<TableChartOutlined />}
                                  label={table}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                />
                              </TableCell>
                            </TableRow>
                            {
                              data[db][table] && data[db][table] instanceof Array && data[db][table].length > 0 ? (
                                data[db][table].map((rowdata, i) => (
                                  <TableRow key={i}>
                                    <TableCell>
                                      <strong>{rowdata.columns}</strong>
                                    </TableCell>
                                    <TableCell>
                                      <Chip
                                        label={rowdata.modifyType}
                                        size="small"
                                        style={{ backgroundColor: colorForStatus(rowdata.modifyType)[200], color: "black" }}
                                        variant="outlined"
                                      />
                                    </TableCell>
                                    <TableCell style={{ backgroundColor: colorForStatus("none")[200], color: "black" }}>
                                      {rowdata.previous}
                                    </TableCell>
                                    <TableCell style={{ backgroundColor: colorForStatus(rowdata.modifyType)[200], color: "black" }}>
                                      {rowdata.query}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow key={i}>
                                  <TableCell colSpan={4}>
                                    No Changes
                                  </TableCell>
                                </TableRow>
                              )
                            }
                          </TableBody>
                        ))
                      ) : (
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              No Changes
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )
                    }
                  </Table>
                  <Divider />
                </Paper>
              ))
            ))
          ) : (<></>)
        }
      </Box>
    </Container>
  );
}

export default App;
