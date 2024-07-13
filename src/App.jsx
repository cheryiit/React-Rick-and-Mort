// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import Filter from './components/Filter';
import Pagination from './components/Pagination';
import Details from './components/Details';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const detailsRef = useRef(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchAllData = async () => {
      let allData = [];
      let nextUrl = 'https://rickandmortyapi.com/api/character';

      try {
        while (nextUrl) {
          const response = await axios.get(nextUrl);
          allData = [...allData, ...response.data.results];
          nextUrl = response.data.info.next;
        }
        setData(allData);
        setFilteredData(allData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleFilter = (filters) => {
    const filtered = data.filter(character => {
      const age = Math.floor((new Date() - new Date(character.created)) / (1000 * 60 * 60 * 24 * 365));
      const episodeIds = character.episode.map((ep) => ep.split('/').pop());

      return (
        character.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        character.species.toLowerCase().includes(filters.species.toLowerCase()) &&
        (filters.gender === '' || character.gender === filters.gender) &&
        (filters.status === '' || character.status === filters.status) &&
        (filters.origin === '' || character.origin.name === filters.origin) &&
        (filters.location === '' || character.location.name === filters.location) &&
        (filters.episode === '' || episodeIds.includes(filters.episode)) &&
        (filters.minAge === '' || age >= filters.minAge) &&
        (filters.maxAge === '' || age <= filters.maxAge)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (key === 'age') {
        aValue = Math.floor((new Date() - new Date(a.created)) / (1000 * 60 * 60 * 24 * 365));
        bValue = Math.floor((new Date() - new Date(b.created)) / (1000 * 60 * 60 * 24 * 365));
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on results per page change
  }, [resultsPerPage]);

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
    setTimeout(() => {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Delay to ensure the ref is updated before scrolling
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredData.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(filteredData.length / resultsPerPage);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <Typography variant="h4" align="center" gutterBottom>
        Rick and Morty Characters
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" onClick={toggleFilters}>
          {filtersOpen ? 'Close Filters' : 'Open Filters'}
        </Button>
        <Typography variant="subtitle1">{`Total Characters: ${filteredData.length}`}</Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Results per page</InputLabel>
          <Select
            value={resultsPerPage}
            onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
            label="Results per page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Filter onFilter={handleFilter} filtersOpen={filtersOpen} filteredData={filteredData} />
      <DataTable data={currentResults} onRowClick={handleRowClick} onSort={handleSort} sortConfig={sortConfig} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div ref={detailsRef}>
        {selectedCharacter && <Details character={selectedCharacter} onClose={handleCloseDetails} />}
      </div>
    </div>
  );
};

export default App;
