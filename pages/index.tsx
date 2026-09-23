import Head from "next/head";
import { Inter } from "next/font/google";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { NextPage } from "next";
import withLayoutHome from "@/libs/layout/withHomeLayout";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <>
        <Head>
          <title>ys</title>
          <meta name="description" content="Public portfolio website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>Welcome to my web site (Mobile)</div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>ys</title>
          <meta name="description" content="Public portfolio website" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>Welcome to my web site(Desktop)</div>
      </>
    );
  }
};

export default withLayoutHome(HomePage);
