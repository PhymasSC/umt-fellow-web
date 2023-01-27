import {  CommunityList } from "@components/index";
import { Card, Container, Title } from "@mantine/core";

const communities = [
	{
		id: 1,
		name: "Comtech",
		description: "A group of enthusiasts who love to code",
		avatar: "https://picsum.photos/100",
		},
		{
		id: 2,
		name: "Foodies",
		description: "A community for food lovers to share recipes and restaurant recommendations",
		avatar: "https://picsum.photos/102",
		},
		{
		id: 3,
		name: "Fitness Enthusiasts",
		description: "A community for people who love to stay active and healthy",
		avatar: "https://picsum.photos/103",
		},
		{
		id: 4,
		name: "Outdoor Adventures",
		description: "A community for people who love hiking, camping, and exploring nature",
		avatar: "https://picsum.photos/104",
		},
		{
		id: 5,
		name: "Book Club",
		description: "A community for book lovers to discuss and review literature",
		avatar: "https://picsum.photos/105",
		},
		{
		id: 6,
		name: "DIY & Home Improvement",
		description: "A community for people who love to tackle home improvement projects and DIY crafts",
		avatar: "https://picsum.photos/106",
		},
		{
		id: 7,
		name: "Pet Lovers",
		description: "A community for pet owners to share tips, advice, and pictures of their furry friends",
		avatar: "https://picsum.photos/107",
		}
];
const Communities = () => {
	return (
		<Container>
			<Title mb="md">Community List</Title>
			<CommunityList communities={communities} />
		</Container>
	);
};

export default Communities;
