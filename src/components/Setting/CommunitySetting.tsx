import {
	Stack,
	Group,
	Switch,
	Avatar,
	Card,
	Text,
	Title,
	Accordion,
	TextInput,
	Button,
	Textarea,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons";
import KeyValueInput from "./KeyValueInput";
import SettingLayout from "./SettingLayout";

const CommunitySetting = () => {
	const configuration = [
		{
			label: "Read Receipts",
			description:
				"Control whether others can see when you have read their messages",
		},
	];
	return (
		<Stack>
			<Accordion>
				<Accordion.Item value="pet-lovers">
					<Accordion.Control>
						<Group>
							<Avatar
								src="https://picsum.photos/200"
								size="md"
								radius="xl"
							/>
							<Title order={3}>Pet Lovers</Title>
						</Group>
					</Accordion.Control>
					<Accordion.Panel>
						<SettingLayout
							layout={"vertical"}
							label={"Community Name"}
							description={"The name of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>
						<SettingLayout
							layout={"vertical"}
							label={"Community Description"}
							description={"The description of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>

						<SettingLayout
							layout={"vertical"}
							label={"Community Rules"}
							description={"The rules of the community"}
							input={
								<KeyValueInput
									_key="Name"
									value="Description"
								/>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Delete Community"}
							description={"Delete the community"}
							input={
								<Button color="red" leftIcon={<IconTrash />}>
									Delete Community
								</Button>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Save Changes"}
							description={"Save the changes"}
							input={
								<Button color="green" leftIcon={<IconPencil />}>
									Save Changes
								</Button>
							}
						/>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="comtech">
					<Accordion.Control>
						<Group>
							<Avatar
								src="https://picsum.photos/201"
								size="md"
								radius="xl"
							/>
							<Title order={3}>Comtech</Title>
						</Group>
					</Accordion.Control>
					<Accordion.Panel>
						<SettingLayout
							layout={"vertical"}
							label={"Community Name"}
							description={"The name of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>
						<SettingLayout
							layout={"vertical"}
							label={"Community Description"}
							description={"The description of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>

						<SettingLayout
							layout={"vertical"}
							label={"Community Rules"}
							description={"The rules of the community"}
							input={
								<KeyValueInput
									_key="Name"
									value="Description"
								/>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Delete Community"}
							description={"Delete the community"}
							input={
								<Button color="red" leftIcon={<IconTrash />}>
									Delete Community
								</Button>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Save Changes"}
							description={"Save the changes"}
							input={
								<Button color="green" leftIcon={<IconPencil />}>
									Save Changes
								</Button>
							}
						/>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="foodies">
					<Accordion.Control>
						<Group>
							<Avatar
								src="https://picsum.photos/202"
								size="md"
								radius="xl"
							/>
							<Title order={3}>Foodies</Title>
						</Group>
					</Accordion.Control>
					<Accordion.Panel>
						<SettingLayout
							layout={"vertical"}
							label={"Community Name"}
							description={"The name of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>
						<SettingLayout
							layout={"vertical"}
							label={"Community Description"}
							description={"The description of the community"}
							input={<TextInput mt="-1em" mb="1em"></TextInput>}
						/>

						<SettingLayout
							layout={"vertical"}
							label={"Community Rules"}
							description={"The rules of the community"}
							input={
								<KeyValueInput
									_key="Name"
									value="Description"
								/>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Delete Community"}
							description={"Delete the community"}
							input={
								<Button color="red" leftIcon={<IconTrash />}>
									Delete Community
								</Button>
							}
						/>

						<SettingLayout
							layout={"horizontal"}
							label={"Save Changes"}
							description={"Save the changes"}
							input={
								<Button color="green" leftIcon={<IconPencil />}>
									Save Changes
								</Button>
							}
						/>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Stack>
	);
};

export default CommunitySetting;
