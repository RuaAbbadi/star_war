// App.tsx
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import {
  Button,
  CircularProgress,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../starWarTable/StarWars.scss";
import { useDebounce } from "../../utils/hooks";
import EmptyStatus from "../../components/EmptyStatus/EmptyStatus";
import { fetchPeople, fetchPeopleBySearch } from "../../api/api";

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  eye_color: string;
}
const PRIMARY_COLOR = "#A61D33";
const SECONDARY_COLOR = "#EDF7ED";

const StarWarsTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [currentApiPage, setCurrentApiPage] = useState<number>(1);
  const [theme, setTheme] = useState<string>(PRIMARY_COLOR);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const recordsPerPage = 3;
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [error, setError] = useState<string | null>("");

  const loadPeople = async (page: number) => {
    setLoading(true);
    const result = await fetchPeople(page);

    if (result.data) {
      setPeople((prevPeople) => [...prevPeople, ...result.data.results]);
      setTotalRecords(result.data.count);
      setCurrentApiPage(page + 1);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      const fetchAndSetPeople = async () => {
        const result = await fetchPeopleBySearch(debouncedSearchQuery);
        if (result.data) {
          setPeople(result.data.results);
          setTotalRecords(result.data.results.length);
        }
        if (result.error) {
          setError(result.error);
        }
      };
      fetchAndSetPeople();
    } else if (debouncedSearchQuery === "") {
      setCurrentPage(1);
      loadPeople(1);
    }
  }, [debouncedSearchQuery]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return people.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      const totalFetched = people.length;
      const requiredDataCount = newPage * recordsPerPage;

      if (totalFetched < requiredDataCount) {
        loadPeople(currentApiPage);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = () => {
    navigate("/details");
  };

  const handleTheme = () => {
    setTheme((prevTheme: string) =>
      prevTheme === PRIMARY_COLOR ? SECONDARY_COLOR : PRIMARY_COLOR
    );
  };

  return (
    <div className="star-war-page">
      <h2 className="star-war-header" onClick={handleTheme}>
        Star Wars
      </h2>
      <div className="search-container">
        <div className="search-label" style={{ backgroundColor: theme }}>
          <span>Search by name:</span>
        </div>

        <TextField
          variant="outlined"
          className="search-field"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : debouncedSearchQuery && people.length === 0 ? (
        <EmptyStatus />
      ) : (
        <table>
          <thead>
            <TableRow style={{ backgroundColor: theme }}>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Eye Color</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </thead>
          <tbody>
            {getPaginatedData().map((person, index) => (
              <TableRow key={index}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.gender}</TableCell>
                <TableCell>{person.height}</TableCell>
                <TableCell>{person.eye_color}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigation}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StarWarsTable;
