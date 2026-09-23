import useDeviceDetect from "../hooks/useDeviceDetect";

const Navbar = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <div>Navbar (Mobile)</div>
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
