import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AvatarEdit from "react-avatar-edit";
import { styled, useTheme } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import PropTypes from "prop-types";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const StyledPaper = styled(Paper)(spacing);

const useStyles = makeStyles((theme) => ({
  validateButton: {
    color: "white",
    minWidth: 20,
    width: 20,
    minHeight: 20,
    height: 20,
    position: "absolute",
    zIndex: 999,
    cursor: "pointer",
    right: theme.spacing(1) + 10,
    top: theme.spacing(1) + 10,
    backgroundColor: "transparent",
    border: "none",
  },
}));

export default function ActivityAvatarEditor(props) {
  const [avatar, setAvatar] = useState(""); //TODO precise avatar format png Img
  const [allowValidation, setAllowValidation] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  console.log("ActivityAvatarEditor rerender");
  console.log("props.open = ", props.open);
  console.log("allowValidation =", allowValidation);
  return (
    <StyledPaper p={1} variant="outlined">
      <AvatarEdit
        width={390}
        height={295}
        onCrop={(avatar) => {
          //TODO console.log("Oncrop Avatar =", avatar);
          setAvatar(avatar);
          setAllowValidation(true);
        }}
        onClose={() => props.onClose()}
        //label="Coucou" //TODO I18N
        //onBeforeFileLoad={this.onBeforeFileLoad}
        src=""
      ></AvatarEdit>
      {allowValidation && (
        <DoneOutlineIcon
          aria-label="Validate"
          onClick={(e) => {
            e.stopPropagation();
            props.onClose();
          }}
          className={classes.validateButton}
        />
      )}
    </StyledPaper>
  );
}

ActivityAvatarEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  setNewAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
