// src/components/DataTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: '#4caf50', // Eski yeşil renk
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Tablonun etrafındaki çerçeve
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DataTable = ({ data, onRowClick, onSort, sortConfig = { key: 'name', direction: 'asc' } }) => {
  const { key, direction } = sortConfig;

  const createSortHandler = (property) => (event) => {
    onSort(property);
  };

  return (
    <TableContainer style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell sortDirection={key === 'name' ? direction : false}>
              <TableSortLabel
                active={key === 'name'}
                direction={key === 'name' ? direction : 'asc'}
                onClick={createSortHandler('name')}
              >
                Name
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell sortDirection={key === 'species' ? direction : false}>
              <TableSortLabel
                active={key === 'species'}
                direction={key === 'species' ? direction : 'asc'}
                onClick={createSortHandler('species')}
              >
                Species
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell sortDirection={key === 'gender' ? direction : false}>
              <TableSortLabel
                active={key === 'gender'}
                direction={key === 'gender' ? direction : 'asc'}
                onClick={createSortHandler('gender')}
              >
                Gender
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell sortDirection={key === 'status' ? direction : false}>
              <TableSortLabel
                active={key === 'status'}
                direction={key === 'status' ? direction : 'asc'}
                onClick={createSortHandler('status')}
              >
                Status
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell sortDirection={key === 'age' ? direction : false}>
              <TableSortLabel
                active={key === 'age'}
                direction={key === 'age' ? direction : 'asc'}
                onClick={createSortHandler('age')}
              >
                Age
              </TableSortLabel>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.species}</StyledTableCell>
              <StyledTableCell>{row.gender}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{Math.floor((new Date() - new Date(row.created)) / (1000 * 60 * 60 * 24 * 365))}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
