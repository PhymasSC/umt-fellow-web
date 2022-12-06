import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { APP_NAME } from "@constants/metadata";
import { Feed } from "@components/index";

const data = [
	{
		title: "test",
		username: "Lau Sheng Cher",
		profilePic: "https://placeimg.com/192/192/people",
		createdTime: "3 Minutes ago",
		content: "Test",
		voteCount: 738,
		badges: [
			{ value: "Moderator", color: "yellow" },
			{ value: "Founder", color: "teal" },
		],
		image: "https://placeimg.com/192/192/people",
		slug: "5",
	},
];

const explore: NextPage = () => {
	return (
		<>
			<Head>
				<title>{`Explore | ${APP_NAME}`}</title>
			</Head>
			<Feed feeds={data} />
		</>
	);
};

export default explore;
