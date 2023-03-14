import {
	Button,
	Grid,
	Flex,
	Avatar,
	Stack,
	Title,
	Text,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import CommunityCardMenu from "./CommunityCardMenu";

interface CommunityCardProps {
	community: {
		id: number;
		name: string;
		description: string;
		avatar: string;
	};
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
	const [isJoined, setIsJoined] = useState(false);
	const { id, name, description, avatar } = community;
	return (
		<Grid>
			<Grid.Col span={1}>
				<Flex h="100%" w="100%" justify="center" align="center">
					<Avatar src={avatar} radius="xl" />
				</Flex>
			</Grid.Col>
			<Grid.Col span={8}>
				<Stack spacing={0}>
					<Title order={3}>{name}</Title>
					<Text w="90%" color="dimmed">
						{description}{" "}
					</Text>
				</Stack>
			</Grid.Col>
			<Grid.Col span={3}>
				<Flex
					h="100%"
					w="100%"
					justify="center"
					align="center"
					gap={10}
				>
					<Link href={`/community/${id}`} passHref>
						<Button component="a" variant="light">
							View
						</Button>
					</Link>
					<CommunityCardMenu isJoined={isJoined} onClick={() => setIsJoined(isJoined => !isJoined)} />
				</Flex>
			</Grid.Col>
		</Grid>
	);
};

export default CommunityCard;
