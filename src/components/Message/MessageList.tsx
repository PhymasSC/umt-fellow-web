import { Container, Divider, SimpleGrid, Box } from "@mantine/core";
import Link from "next/link";
import SingleMessage from "./SingleMessage";

interface MessageListProps {
	data: {
		id: number;
		name: string;
		message: string;
		avatar: string;
		isSelected: boolean;
	}[];
}

const MessageList: React.FC<MessageListProps> = ({ data }) => {
	return (
		<SimpleGrid>
			{data.map((item) => {
				return (
					<Link key={item.id} href={`/message/${item.id}`} passHref>
						<Box
							component="a"
							sx={{
								"&": {
									textDecoration: "none",
									color: "inherit",
								},
							}}
						>
							<SingleMessage
								key={item.id}
								name={item.name}
								message={item.message}
								avatar={item.avatar}
								isSelected={item.isSelected}
							/>
						</Box>
					</Link>
				);
			})}
		</SimpleGrid>
	);
};

export default MessageList;
