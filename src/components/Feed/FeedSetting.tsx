import { useMutation } from "@apollo/client";
import {
	ActionIcon,
	Button,
	CopyButton,
	Group,
	GroupProps,
	Menu,
} from "@mantine/core";
import { DELETE_THREAD } from "@operations/mutations";
import {
	IconCheck,
	IconCopy,
	IconDotsVertical,
	IconEdit,
	IconFlag,
	IconTrash,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RefAttributes } from "react";

interface FeedSettingProps {
	author: {
		id: string;
		name: string;
		image: string;
	};
}
const FeedSetting: React.FC<FeedSettingProps> = ({ author }) => {
	const router = useRouter();
	const [deleteThread] = useMutation(DELETE_THREAD);
	const { data: session } = useSession();

	const removeThread = async () => {
		console.log(router.query?.id?.[0]);
		const res = await deleteThread({
			variables: {
				id: router.query?.id?.[0] || "",
			},
		});
		console.log("Res:", res);
		router.push("/");
	};

	return (
		<Group position="center">
			<Menu withArrow transition="pop">
				<Menu.Target>
					<ActionIcon>
						<IconDotsVertical />
					</ActionIcon>
				</Menu.Target>
				<Menu.Dropdown>
					{session?.user.id === author.id && (
						<>
							<Link
								href={{
									pathname: router.asPath,
									query: "edit",
								}}
								passHref
							>
								<Menu.Item
									component="a"
									icon={<IconEdit size={16} />}
								>
									Edit thread
								</Menu.Item>
							</Link>
							<Menu.Item
								icon={<IconTrash size={16} />}
								onClick={removeThread}
							>
								Delete thread
							</Menu.Item>
							<Menu.Divider />
						</>
					)}
					<CopyButton
						value={`umtfellow.social${router.asPath}`}
						timeout={2000}
					>
						{({ copied, copy }) => (
							<Menu.Item
								icon={
									copied ? (
										<IconCheck size={16} />
									) : (
										<IconCopy size={16} />
									)
								}
								closeMenuOnClick={false}
								//@ts-ignore
								color={copied && "green"}
								onClick={copy}
							>
								{copied ? "Copied" : "Copy"}
							</Menu.Item>
						)}
					</CopyButton>
					<Menu.Item color="red" icon={<IconFlag size={16} />}>
						Report
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
};

export default FeedSetting;
