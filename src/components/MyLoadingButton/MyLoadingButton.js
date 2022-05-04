import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
function MyLoadingButton({
  children,
  classNames,
  loading,
  variant = "contained",
}) {
  return (
    <LoadingButton
      variant={variant}
      type="submit"
      sx={{
        marginTop: "30px",
        marginBottom: "30px",
        backgroundColor: "#519872",
        color: "white",
        width: "max-content",
        "&:hover": {
          backgroundColor: "#519872",
          color: "white",
        },
        "&:disabled": {
          backgroundColor: "#519872",
          color: "transparent",
        },
        ".MuiLoadingButton-loadingIndicator": {
          color: "white",
          size: "25",
        },
        ...classNames,
      }}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
}
MyLoadingButton.propTypes = {
  loding: PropTypes.bool,
  children: PropTypes.node,
  classNames: PropTypes.object,
  variant: PropTypes.string,
};
export default MyLoadingButton;
