import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const Filter = ({ onFilter, filtersOpen, filteredData }) => {
  const [filters, setFilters] = useState({
    name: '', species: '', type: '', gender: '', status: '',
    minAge: '', maxAge: '', origin: '', location: '', episode: ''
  });

  useEffect(() => {
    const uniqueOrigins = [...new Set(filteredData.map((item) => item.origin.name))];
    const uniqueLocations = [...new Set(filteredData.map((item) => item.location.name))];
    const uniqueGenders = [...new Set(filteredData.map((item) => item.gender))];
    const uniqueStatuses = [...new Set(filteredData.map((item) => item.status))];
    const uniqueTypes = [...new Set(filteredData.map((item) => item.type))];
    const uniqueSpecies = [...new Set(filteredData.map((item) => item.species))];

    setFilters((prevFilters) => ({
      ...prevFilters,
      origins: uniqueOrigins,
      locations: uniqueLocations,
      genders: uniqueGenders,
      statuses: uniqueStatuses,
      types: uniqueTypes,
      speciesList: uniqueSpecies,
    }));
  }, [filteredData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {filtersOpen && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Filter by name"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Filter by species"
              name="species"
              value={filters.species}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.speciesList && filters.speciesList.map((species, index) => (
                <MenuItem key={index} value={species}>{species}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Filter by type"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.types && filters.types.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Filter by gender"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.genders && filters.genders.map((gender, index) => (
                <MenuItem key={index} value={gender}>{gender}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Filter by status"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.statuses && filters.statuses.map((status, index) => (
                <MenuItem key={index} value={status}>{status}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label="Filter by origin"
              name="origin"
              value={filters.origin}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.origins && filters.origins.map((origin, index) => (
                <MenuItem key={index} value={origin}>{origin}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Filter by location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">None</MenuItem>
              {filters.locations && filters.locations.map((location, index) => (
                <MenuItem key={index} value={location}>{location}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="number"
              label="Min Age"
              name="minAge"
              value={filters.minAge}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              type="number"
              label="Max Age"
              name="maxAge"
              value={filters.maxAge}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
          </Box>
          <TextField
            type="number"
            label="Filter by episode"
            name="episode"
            value={filters.episode}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
};

export default Filter;
