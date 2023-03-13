import {
	ActionIcon,
	Button,
	Center,
	Grid,
	Stack,
	Textarea,
} from "@mantine/core";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import { Key, useState } from "react";

interface KeyValueInputProps {
	_key: string;
	value: string;
}

const Component = (props: { remove: any }) => {
	const { remove } = props;
	return (
		<Stack>
			<Grid>
				<Grid.Col span={3}>
					<Textarea minRows={1} maxRows={1} label={"Rule"}></Textarea>
				</Grid.Col>
				<Grid.Col span={8}>
					<Textarea
						minRows={1}
						maxRows={5}
						label={"Description"}
					></Textarea>
				</Grid.Col>
				<Grid.Col span={1}>
					<Center
						style={{
							height: "100%",
						}}
					>
						<ActionIcon onClick={remove}>
							<IconCircleMinus />
						</ActionIcon>
					</Center>
				</Grid.Col>
			</Grid>
		</Stack>
	);
};

const KeyValueInput: React.FC<KeyValueInputProps> = (props) => {
	const [items, setItems] = useState([
		<Component key="1" remove={undefined} />,
	]);
	const remove = (val: Key | null) => {
		setItems(
			items.filter((item) => {
				return item.key !== val;
			})
		);
	};
	const addMore = () => {
		return setItems([
			...items,
			<Component key={items.length + 1} remove={remove(items.length)} />,
		]);
	};

	return (
		<>
			{items.map((item) => {
				return item;
			})}
			<Button
				my="1em"
				w={"20%"}
				onClick={addMore}
				variant="default"
				leftIcon={<IconCirclePlus />}
			>
				Add more
			</Button>
		</>
	);
};

export default KeyValueInput;
