import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Form = ({ fields, userDetails, onChange }) => {
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
        fields.map((field) => {
          return (
            <TextField
              id="outlined-basic"
              label={field}
              name={field}
              variant="outlined"
              value={userDetails && userDetails[field]}
              onChange={onChange}
            />
          );
        })}
    </Box>
  );
};

export default Form;
