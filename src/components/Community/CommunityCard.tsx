import {
	ActionIcon,
	Button,
	Card,
	Grid,
	Flex,
	Avatar,
	Stack,
	Title,
	Text,
	Menu,
} from "@mantine/core";
import Link from "next/link";
import {
	IconDotsVertical,
	IconFlag,
	IconPencil,
	IconReport,
	IconTrash,
} from "@tabler/icons";
import { useState } from "react";

interface CommunityCardProps {
	community: {
		id: number;
		name: string;
		description: string;
		avatar: string;
	};
}

const CommunityCard: React.FC<CommunityCardProps> = (props) => {
	const [isJoined, setIsJoined] = useState(false);
	return (
		<Grid>
			<Grid.Col span={1}>
				<Flex h="100%" w="100%" justify="center" align="center">
					<Avatar src={props.community.avatar} radius="xl" />
				</Flex>
			</Grid.Col>
			<Grid.Col span={8}>
				<Stack spacing={0}>
					<Title order={3}>{props.community.name}</Title>
					<Text w="90%" color="dimmed">
						{props.community.description}{" "}
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
					<Link href={`/community/${props.community.id}`} passHref>
						<Button component="a" variant="light">
							View
						</Button>
					</Link>
					<Menu>
						<Menu.Target>
							<ActionIcon>
								<IconDotsVertical />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								color={isJoined ? "green" : "blue"}
								onClick={() => {
									setIsJoined(isJoined ? false : true);
								}}
								closeMenuOnClick={false}
							>
								{isJoined ? "Joined" : "Join"}
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item icon={<IconPencil size={14} />}>
								Edit Community
							</Menu.Item>
							<Menu.Item icon={<IconTrash size={14} />}>
								Delete Community
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item
								color="red"
								icon={<IconFlag size={14} />}
							>
								Report
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			</Grid.Col>
		</Grid>
	);
};

export default CommunityCard;
