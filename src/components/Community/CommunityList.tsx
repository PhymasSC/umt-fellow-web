import { Grid } from "@mantine/core";
import CommunityCard from "./CommunityCard";

interface CommunityListProps {
  communities: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    banner: string;
    creatorId: {
      id: string;
    };
    isJoined: boolean;
  }[];
}

const CommunityList: React.FC<CommunityListProps> = ({ communities }) => {
  return (
    <Grid align="stretch">
      {communities.map((community, index) => (
        <Grid.Col xs={6} md={4} lg={3} xl={2} key={index}>
          <CommunityCard community={community} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default CommunityList;
