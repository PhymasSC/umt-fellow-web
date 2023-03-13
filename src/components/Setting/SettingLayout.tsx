import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";

interface TextInputSettingProps {
	layout: "horizontal" | "vertical";
	label: string;
	description: string;
	input: any;
}

const SettingLayout = (props: TextInputSettingProps) => {
	const { layout, label, description, input, ...rest } = props;
	if (layout === "horizontal")
		return (
			<Flex justify="space-between" align="center" {...rest}>
				<Stack spacing={0}>
					<Text size="sm" weight={500}>
						{label}
					</Text>
					<Text size="xs" color="dimmed" mt={3} mb="xl">
						{description}
					</Text>
				</Stack>
				{input}
			</Flex>
		);
	return (
		<Stack spacing={0} {...rest}>
			<Text size="sm" weight={500}>
				{label}
			</Text>
			<Text size="xs" color="dimmed" mt={3} mb="xl">
				{description}
			</Text>
			{input}
		</Stack>
	);
};

export default SettingLayout;
