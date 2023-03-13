import { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "@constants/metadata";
import { Card, Container } from "@mantine/core";
import { Notification } from "@components/index";

const notification: NextPage = () => {
	return (
		<>
			<Head>
				<title>{`Notification | ${APP_NAME}`}</title>
			</Head>
			<Container>
				<Card
					sx={{
						minHeight: "80vh",
						height: "100%",
					}}
					withBorder
				>
					<Notification />
				</Card>
			</Container>
		</>
	);
};

export default notification;
