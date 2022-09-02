import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Form = ({ fields, userDetails, onChange, fieldsError }) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {fields &&
        fields.map((field,index) => {
          return (
            <TextField
              id="outlined-basic"
              label={field.label}
              name={field.name}
              variant="outlined"
              value={userDetails[field.name]}
              onChange={onChange}
              required={field.required}
              error={fieldsError[field.name]}
              key={`field${index}`}
              data-testid="outlined-basic"
            />
          );
        })}
    </Box>
  );
};

export default Form;
