import { Card, CardSection } from "@mantine/core";
import CommunityCard from "./CommunityCard";

interface CommunityListProps {
	communities: {
		id: number;
		name: string;
		description: string;
		avatar: string;
	}[];
}

const CommunityList: React.FC<CommunityListProps> = ({ communities }) => {
	return (
		<Card withBorder key="community-list">
			{communities.map((community) => (
				<CardSection p={10} py={15} withBorder key={community.id}>
					<CommunityCard community={community} />
				</CardSection>
			))}
		</Card>
	);
};

export default CommunityList;
