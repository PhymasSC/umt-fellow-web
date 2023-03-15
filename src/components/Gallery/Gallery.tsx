import ImagePreview from "@components/Comment/ImagePreview";
import { Grid, SimpleGrid, useMantineTheme } from "@mantine/core";

type Props = {
	images: string[];
};

const Gallery: React.FC<Props> = ({ images }) => {
	const theme = useMantineTheme();
	const PRIMARY_COL_HEIGHT = 700;
	const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - parseFloat(theme.spacing.md) / 2;
	const TERTIARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 3.2 - parseFloat(theme.spacing.md) / 3.2;

	return (
		<SimpleGrid
			cols={images.length > 1 ? 2 : 1}
			spacing="md"
			breakpoints={[{ maxWidth: "sm", cols: 1 }]}
		>
			<Grid>
				<Grid.Col>
					<ImagePreview src={images[0]} title={""} width="100%" height={images.length <= 2 ? PRIMARY_COL_HEIGHT : SECONDARY_COL_HEIGHT} />
					{images.length > 2 && <ImagePreview src={images[1]} title={""} width="100%" height={SECONDARY_COL_HEIGHT} />}
				</Grid.Col>
			</Grid>


			<Grid gutter="md">
				{
					images.length > 2 ? images.slice(2).map((image, index) => (
						<Grid.Col key={index}>
							<ImagePreview src={image} title={""} width="100%" height={images.length === 5 ? TERTIARY_COL_HEIGHT : images.length === 4 ? SECONDARY_COL_HEIGHT : PRIMARY_COL_HEIGHT} />
						</Grid.Col>
					)) : images.length === 2 && images.slice(1, 2).map((image, index) => (
						<Grid.Col key={index}>
							<ImagePreview src={image} title={""} width="100%" height={PRIMARY_COL_HEIGHT} />
						</Grid.Col>
					))}
			</Grid>

		</SimpleGrid>
	);
};

export default Gallery;
