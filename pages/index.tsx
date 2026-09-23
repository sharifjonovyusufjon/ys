import Head from "next/head";
import { Inter } from "next/font/google";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { NextPage } from "next";
import withLayoutHome from "@/libs/layout/withHomeLayout";
import Header from "@/libs/components/HomePage/Header";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <Head>
          <title>Sharifjonov Yusufjon</title>
          <meta
            name="description"
            content="Public portfolio and blog website"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Header />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Sharifjonov Yusufjon</title>
          <meta
            name="description"
            content="Public portfolio and blog website"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <Header />
      </>
    );
  }
};

export default withLayoutHome(HomePage);
