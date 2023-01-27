import { Button, Container, Stack, Tabs, Text } from "@mantine/core";
import { IconChecks, IconSettings } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NotificationCard from "./NotifcationCard";

const Notification = () => {
	const { data: session } = useSession();
	return (
		<Tabs
			defaultValue="all"
			variant="outline"
			radius="xl"
			orientation="vertical"
			sx={{
				minHeight: "80vh",
				height: "100%",
			}}
		>
			<Tabs.List>
				<Tabs.Tab value="all">All</Tabs.Tab>
				<Tabs.Tab value="threads">Threads</Tabs.Tab>
				<Tabs.Tab value="comments">Comments</Tabs.Tab>
				<Tabs.Tab value="messages">Messages</Tabs.Tab>
				<Stack mt="auto" justify="flex-start" align="flex-start">
					<Button
						color="green"
						variant="subtle"
						leftIcon={<IconChecks />}
					>
						Mark all as read
					</Button>
					<Link href={`/setting/${session?.user.id}`} passHref>
						<Button
							component="a"
							variant="subtle"
							leftIcon={<IconSettings />}
							w="100%"
						>
							Setting
						</Button>
					</Link>
				</Stack>
			</Tabs.List>

			<Tabs.Panel value="all">
				<Container>
					<h1>All Notifcations</h1>
					<Text color="dimmed">Today</Text>
					<NotificationCard text={"John Doe sent you a message!"} />
					<NotificationCard
						text={"David Khor replies you on a comment!"}
					/>
					<NotificationCard
						text={"Jane Doe replies you on a thread!"}
					/>
					<Text color="dimmed">Yesterday</Text>
					<NotificationCard text={"Your thread has been reported!"} />
					<NotificationCard
						text={"You had successfully edited your thread!"}
					/>
					<Text color="dimmed">28/01/2023</Text>
					<NotificationCard text={"John Doe liked your thread!"} />
					<NotificationCard
						text={"David Khor replies on your thread!"}
					/>
					<NotificationCard text={"Amanda Tan sent you a message!"} />
				</Container>
			</Tabs.Panel>
			<Tabs.Panel value="threads">
				<Container>
					<h1>Threads Notifcations</h1>
					<Text color="dimmed">Today</Text>
					<NotificationCard
						text={"David Khor replies you on a comment!"}
					/>
					<NotificationCard
						text={"Jane Doe replies you on a thread!"}
					/>
					<Text color="dimmed">Yesterday</Text>
					<NotificationCard text={"Your thread has been reported!"} />
					<NotificationCard
						text={"You had successfully edited your thread!"}
					/>
					<Text color="dimmed">28/01/2023</Text>
					<NotificationCard text={"John Doe liked your thread!"} />
					<NotificationCard
						text={"David Khor replies on your thread!"}
					/>
				</Container>
			</Tabs.Panel>
			<Tabs.Panel value="comments">
				<Container>
					<h1>Comments Notifcations</h1>
					<Text color="dimmed">Today</Text>
					<NotificationCard
						text={"David Khor replies you on a comment!"}
					/>
				</Container>
			</Tabs.Panel>
			<Tabs.Panel value="messages">
				<Container>
					<h1>Messages Notifcations</h1>
					<Text color="dimmed">Today</Text>
					<NotificationCard text={"John Doe sent you a message!"} />
					<Text color="dimmed">28/01/2023</Text>
					<NotificationCard text={"Amanda Tan sent you a message!"} />
				</Container>
			</Tabs.Panel>
		</Tabs>
	);
};

export default Notification;
