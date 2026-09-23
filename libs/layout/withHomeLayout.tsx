import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const withLayoutHome = (Component: any) => {
  return (props: any) => {
    const device = useDeviceDetect();
    if (device == "mobile") {
      return (
        <>
          <Head>
            <title>Ys</title>
          </Head>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              alignItems: "center",
            }}
          >
            <Navbar />
            <Component {...props} />
            <Footer />
          </div>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>Ys</title>
          </Head>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              alignItems: "center",
            }}
          >
            <Navbar />
            <Component {...props} />
            <Footer />
          </div>
        </>
      );
    }
  };
};

export default withLayoutHome;
