import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
function MyLoadingButton({
  children,
  classNames,
  loading,
  variant = "contained",
  ...props
}) {
  return (
    <LoadingButton
      variant={variant}
      {...props}
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
          backgroundColor: "transparent",
          color: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
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
