import useDeviceDetect from "../hooks/useDeviceDetect";

const Navbar = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "90px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "390px",
              height: "50px",
              border: "1px solid #C4C4C4",
              borderRadius: "10px",
            }}
          ></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Navbar (Desktop)</div>
      </>
    );
  }
};
export default Navbar;
