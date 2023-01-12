import { Feed, Typography } from "@components/index";
import {
	Card,
	Container,
	Flex,
	Grid,
	Group,
	Skeleton,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { Footer, Comment } from "@components/index";
import { IconTestPipe2 } from "@tabler/icons";
import Link from "next/link";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_THREADS } from "@operations/queries";

const Home: NextPage = () => {
	const { data: session } = useSession();
	const { loading, error, data } = useQuery(GET_THREADS);

	return (
		<>
			<Container
				m="xl"
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
				fluid
			>
				<Grid>
					<Container>
						<Flex mih={50} gap="md" direction="column" wrap="wrap">
							{session && (
								<Comment
									author={{
										name: session?.user?.name || "",
										image: session?.user?.image || "",
									}}
								/>
							)}
							{loading ? (
								<Skeleton sx={(theme) => ({ width: "100%" })}>
									Page is loading
								</Skeleton>
							) : (
								<Feed feeds={data} />
							)}
						</Flex>
					</Container>
					<Grid.Col md={12} lg={4}>
						<Container>
							<Card
								sx={(theme) => ({
									display: "flex",
									alignItems: "center",
									backgroundColor: theme.colors.yellow[1],
									border: `1px solid`,
									borderColor: theme.colors.yellow[5],
									minHeight: "8em",
									paddingLeft: "2em !important",
								})}
							>
								<Text
									sx={(theme) => ({
										color: theme.colors.yellow[9],
									})}
								>
									<Group>
										<IconTestPipe2 />
										<Title order={3}>Beta</Title>
									</Group>
									<Space h={5} />
									<Typography>
										<Text
											sx={(theme) => ({
												color: theme.colors.yellow[9],
											})}
											weight={500}
										>
											We are currently in beta. If you
											find any bugs, please report them{" "}
											<Link href="/contact-us">here</Link>
											.
										</Text>
									</Typography>
								</Text>
							</Card>
							<Space h={30} />
							<Footer />
						</Container>
					</Grid.Col>
				</Grid>
			</Container>
		</>
	);
};

export default Home;
