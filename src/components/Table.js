import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { styled } from '@mui/system';

const WordWrapper = styled('div')({
overflowWrap: 'break-word',
maxWidth:'400px',
});

const CustomeTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fields</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            Object.keys(data).map((field) => (
              <TableRow
                key={field}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {field}
                </TableCell>
                <TableCell component="th" scope="row">
                  <WordWrapper>{data[field]}</WordWrapper>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomeTable;
