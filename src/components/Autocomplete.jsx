import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};
export const FormikProductautocomplete = ({
  value = null,      // value = RecordID
  onChange = () => {},
  options = [],
  disabled = false,
  ...props
}) => {

  // ✅ Convert ID into full object
  const selectedOption =
    value != null
      ? options.find((opt) => opt.RecordID == value) || null
      : null;

  return (
    <Autocomplete
      size="small"
      fullWidth
      options={options || []}
      value={selectedOption}
       disabled={disabled} 
      isOptionEqualToValue={(option, val) =>
        option?.RecordID === val?.RecordID
      }
      getOptionLabel={(option) => option?.Name || ""}
      onChange={(event, newValue) =>
        onChange(newValue ? newValue.RecordID : null)
      }
      renderInput={(params) => (
        <TextField
          {...params}
        //   label={props.label || "Select Options"}
          label={props.label}
        />
      )}
      {...props}
    />
  );
};
// export const FormikProductautocomplete = ({
//   value = null,
//   onChange = () => {},
//   options = [],
//   height = 20,
//   ...props
// }) => {
//     console.log(value,"value");
//     const selectedOption =
//     value != null
//       ? options.find((opt) => opt.RecordID == value) || null
//       : null;
//     console.log(options,"options");
//     console.log(selectedOption,"selectedOption");
//   return (
//     <Autocomplete
//       size="small"
//       limitTags={1}
//       fullWidth
//       options={options || []}
//       value={value}
//       isOptionEqualToValue={(option, value) =>
//         option?.RecordID === value
//       }
//       getOptionLabel={(option) => option?.Name || ""}
//       onChange={(event, newValue) => onChange(newValue)}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={props.label || "Select Options"}
//           {...params.InputProps}
//         />
//       )}
//       {...props}
//     />
//   );
// };