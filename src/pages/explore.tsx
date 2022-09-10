import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { APP_NAME } from "@constants/metadata";

const explore: NextPage = () => {
	return (
		<>
			<Head>
				<title>{`Explore | ${APP_NAME}`}</title>
			</Head>
			<div>explore</div>
		</>
	);
};

export default explore;
