import { Card } from "@mantine/core";
import CommunityCard from "./CommunityCard";

interface CommunityListProps {
	communities: {
		id: number;
		name: string;
		description: string;
		avatar: string;
	}[];
}

const CommunityList: React.FC<CommunityListProps> = (props) => {
	return (
		<Card withBorder>
			{props.communities.map((community, index) => (
				<>
					<Card.Section
						p={10}
						py={
							index > 0 && index < props.communities.length - 1
								? 15
								: 10
						}
						key={props.communities[index].id}
						withBorder={
							index > 0 && index < props.communities.length - 1
						}
					>
						<CommunityCard community={community} />
					</Card.Section>
				</>
			))}
		</Card>
	);
};

export default CommunityList;
