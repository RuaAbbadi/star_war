// PersonDetails.tsx
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

interface PersonDetailsProps {
  person: Person | null;
  handleBack: () => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({
  person,
  handleBack,
}) => {
  if (!person) {
    return <div>No person data available</div>;
  }

  return (
    <div>
      <Typography variant="h4">{person?.name}</Typography>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{person.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{person.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair Color</TableCell>
              <TableCell>{person.hair_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Skin Color</TableCell>
              <TableCell>{person.skin_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eye Color</TableCell>
              <TableCell>{person.eye_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birth Year</TableCell>
              <TableCell>{person.birth_year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{person.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Homeworld</TableCell>
              <TableCell>{person.homeworld}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Films</TableCell>
              <TableCell>
                <ul>
                  {person.films.map((film: string, index: number) => (
                    <li key={index}>{film}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vehicles</TableCell>
              <TableCell>
                <ul>
                  {person.vehicles.map((vehicle: string, index: number) => (
                    <li key={index}>{vehicle}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Starships</TableCell>
              <TableCell>
                <ul>
                  {person.starships.map((starship: string, index: number) => (
                    <li key={index}>{starship}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ marginTop: "24px" }}
        onClick={handleBack}
      >
        Back to Star War table
      </Button>
    </div>
  );
};

export default PersonDetails;
