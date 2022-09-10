import { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "src/constants/metadata";

const notification: NextPage = () => {
	return (
		<>
			<Head>
				<title>{`Notification | ${APP_NAME}`}</title>
			</Head>
			<div>notification</div>
		</>
	);
};

export default notification;
