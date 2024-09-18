import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import "../details/Details.scss";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

type FormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date | null;
  disorders: string[];
  workspaceTemplate: string[];
};

const DISORDER_VALUES = [
  "PD",
  "ET",
  "Dyst_NG",
  "OCD",
  "Tourette",
  "Epilepsy",
  "Other",
];

const AddPatientForm = () => {
  const [workspaces, setWorkspaces] = useState([""]);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: null,
      disorders: [],
      workspaceTemplate: [""],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      dateOfBirth: Yup.string().required("Date of birth is required"),
      disorders: Yup.array()
        .min(1, "At least one disorder is required")
        .required("Disorder is required"),
      workspaceTemplate: Yup.array()
        .of(Yup.string().required("Workspace is required"))
        .min(1, "At least one workspace is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  const handleAddWorkspace = () => {
    setWorkspaces([...workspaces, ""]);
    formik.setFieldValue("workspaceTemplate", [
      ...formik.values.workspaceTemplate,
      "",
    ]);
  };

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form">
      <Typography variant="h5" gutterBottom>
        Add a patient
      </Typography>

      <div className="row">
        <TextField
          fullWidth
          label={<span className="required-label">First name</span>}
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
        />

        <TextField
          fullWidth
          label={<span className="required-label">Last name</span>}
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
        />
      </div>

      <FormControl
        component="fieldset"
        margin="normal"
        fullWidth
        className="gender-radio-group"
      >
        <Typography variant="body1" gutterBottom>
          <span className="required-label">Gender</span>
        </Typography>
        <RadioGroup
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          row
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
        </RadioGroup>
        {formik.touched.gender && formik.errors.gender ? (
          <Typography color="error">{formik.errors.gender}</Typography>
        ) : null}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body1" gutterBottom>
          <span className="required-label">Date of Birth</span>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
            textField={(params) => (
              <TextField
                {...params}
                style={{ width: "50%" }}
                margin="normal"
                error={
                  formik.touched.dateOfBirth &&
                  Boolean(formik.errors.dateOfBirth)
                }
                helperText={
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                }
              />
            )}
          />
        </LocalizationProvider>
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <Typography color="error">{formik.errors.dateOfBirth}</Typography>
        ) : null}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Typography variant="body1" gutterBottom>
          <span className="required-label">Disorder</span>
        </Typography>
        <FormGroup row>
          {DISORDER_VALUES.map((disorder) => (
            <FormControlLabel
              key={disorder}
              control={
                <Checkbox
                  name="disorders"
                  value={disorder}
                  checked={formik.values.disorders.includes(disorder)}
                  onChange={formik.handleChange}
                />
              }
              label={disorder}
            />
          ))}
        </FormGroup>

        {formik.touched.disorders && formik.errors.disorders ? (
          <Typography color="error">{formik.errors.disorders}</Typography>
        ) : null}
      </FormControl>

      <div className="workspaces">
        <div className="workspace-container">
          {workspaces.map((_, index) => (
            <FormControl
              fullWidth
              margin="normal"
              key={index}
              className="workspace-item"
            >
              <InputLabel>
                <span className="required-label">Workspace Template</span>
              </InputLabel>
              <Select
                name={`workspaceTemplate[${index}]`}
                value={formik.values.workspaceTemplate[index] || ""}
                onChange={(event) =>
                  formik.setFieldValue(
                    `workspaceTemplate[${index}]`,
                    event.target.value
                  )
                }
                onBlur={formik.handleBlur}
                error={
                  formik.touched.workspaceTemplate &&
                  formik.touched.workspaceTemplate[index] &&
                  Boolean(formik.errors.workspaceTemplate?.[index])
                }
              >
                <MenuItem value="Template1">Template1</MenuItem>
                <MenuItem value="Template2">Template2</MenuItem>
              </Select>
              {formik.touched.workspaceTemplate &&
                formik.touched.workspaceTemplate[index] &&
                formik.errors.workspaceTemplate?.[index] && (
                  <Typography color="error">
                    {formik.errors.workspaceTemplate[index]}
                  </Typography>
                )}
            </FormControl>
          ))}
        </div>
        <Button variant="outlined" onClick={handleAddWorkspace}>
          Add more workspace
        </Button>
      </div>

      <div className="action-buttons">
        <Button
          className="save-button"
          type="submit"
          variant="contained"
          size="large"
        >
          Save
        </Button>

        <Button
          className="cancel-button"
          type="button"
          variant="outlined"
          size="large"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddPatientForm;
