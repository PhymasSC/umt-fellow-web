import ImagePreview from "@components/Comment/ImagePreview";
import { Grid, SimpleGrid, useMantineTheme, Image } from "@mantine/core";

const PRIMARY_COL_HEIGHT = 700;

type Props = {
	images: string[];
};

const Gallery: React.FC<Props> = ({ images }) => {
	const theme = useMantineTheme();
	const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
	const TERTIARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 3 - theme.spacing.md / 3;

	if (images.length == 5) {
		return (
			<>
				<SimpleGrid
					cols={2}
					spacing="md"
					breakpoints={[{ maxWidth: "sm", cols: 1 }]}
				>
					<Grid>
						<Grid.Col>
							<ImagePreview
								src={images[0]}
								title={""}
								width="100%"
								height={SECONDARY_COL_HEIGHT}
							/>
						</Grid.Col>
						<Grid.Col>
							<ImagePreview
								src={images[1]}
								title={""}
								width="100%"
								height={SECONDARY_COL_HEIGHT}
							/>
						</Grid.Col>
					</Grid>
					<Grid gutter="xs">
						<Grid.Col>
							<ImagePreview
								src={images[2]}
								title={""}
								width="100%"
								height={TERTIARY_COL_HEIGHT}
							/>
						</Grid.Col>
						<Grid.Col>
							<ImagePreview
								src={images[3]}
								title={""}
								width="100%"
								height={TERTIARY_COL_HEIGHT}
							/>
						</Grid.Col>
						<Grid.Col>
							<ImagePreview
								src={images[4]}
								title={""}
								width="100%"
								height={TERTIARY_COL_HEIGHT}
							/>
						</Grid.Col>
					</Grid>
				</SimpleGrid>
			</>
		);
	} else if (images.length == 4) {
		return (
			<SimpleGrid
				cols={2}
				spacing="md"
				breakpoints={[{ maxWidth: "sm", cols: 1 }]}
			>
				<ImagePreview
					src={images[0]}
					title={""}
					width="100%"
					height={PRIMARY_COL_HEIGHT}
				/>
				<Grid gutter="md">
					<Grid.Col>
						<ImagePreview
							src={images[1]}
							title={""}
							width="100%"
							height={SECONDARY_COL_HEIGHT}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<ImagePreview
							src={images[2]}
							title={""}
							width="100%"
							height={SECONDARY_COL_HEIGHT}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<ImagePreview
							src={images[3]}
							title={""}
							width="100%"
							height={SECONDARY_COL_HEIGHT}
						/>
					</Grid.Col>
				</Grid>
			</SimpleGrid>
		);
	} else if (images.length == 3) {
		return (
			<SimpleGrid
				cols={2}
				spacing="md"
				breakpoints={[{ maxWidth: "sm", cols: 1 }]}
			>
				<ImagePreview
					src={images[0]}
					title={""}
					width="100%"
					height={PRIMARY_COL_HEIGHT}
				/>
				<Grid gutter="md">
					<Grid.Col>
						<ImagePreview
							src={images[1]}
							title={""}
							width="100%"
							height={SECONDARY_COL_HEIGHT}
						/>
					</Grid.Col>
					<Grid.Col>
						<ImagePreview
							src={images[2]}
							title={""}
							width="100%"
							height={SECONDARY_COL_HEIGHT}
						/>
					</Grid.Col>
				</Grid>
			</SimpleGrid>
		);
	} else if (images.length == 2) {
		return (
			<SimpleGrid
				cols={2}
				spacing="md"
				breakpoints={[{ maxWidth: "sm", cols: 1 }]}
			>
				<ImagePreview
					src={images[0]}
					title={""}
					width="100%"
					height={PRIMARY_COL_HEIGHT}
				/>
				<ImagePreview
					src={images[1]}
					title={""}
					width="100%"
					height={PRIMARY_COL_HEIGHT}
				/>
			</SimpleGrid>
		);
	} else if (images.length == 1) {
		return (
			<SimpleGrid
				cols={1}
				spacing="md"
				breakpoints={[{ maxWidth: "sm", cols: 1 }]}
			>
				<ImagePreview
					src={images[0]}
					title={""}
					width="100%"
					height={PRIMARY_COL_HEIGHT}
				/>
			</SimpleGrid>
		);
	}
	return <></>;
};

export default Gallery;
