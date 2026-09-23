import useDeviceDetect from "../hooks/useDeviceDetect";

const Footer = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <div>Footer (Mobile)</div>
      </>
    );
  } else {
    return (
      <>
        <div>Footer (Desktop)</div>
      </>
    );
  }
};

export default Footer;
