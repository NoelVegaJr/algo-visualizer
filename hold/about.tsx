import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../src/utils/trpc";

const About: NextPage = () => {
  return <div>About</div>;
};

export default About;
