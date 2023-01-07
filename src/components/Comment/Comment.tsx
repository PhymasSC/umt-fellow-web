import {
	createStyles,
	Text,
	Avatar,
	Group,
	TypographyStylesProvider,
	Paper,
	Textarea,
	Flex,
	Container,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
	comment: {
		padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
	},

	body: {
		paddingLeft: 54,
		paddingTop: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
	},

	content: {
		"& > p:last-child": {
			marginBottom: 0,
		},
	},
}));

interface CommentHtmlProps {
	postedAt: string;
	body: string;
	author: {
		name: string;
		image: string;
	};
}

const Comment = (props: CommentHtmlProps) => {
	const { postedAt, body, author } = props;
	const { classes } = useStyles();
	return (
		<Paper withBorder radius="md" className={classes.comment}>
			<Flex gap="md" justify="flex-start" align="center">
				<Avatar src={author.image} alt={author.name} radius="xl" />
				<Container
					sx={{
						width: "100%",
					}}
					fluid
				>
					<Link href="thread/create">
						<Textarea
							radius="xl"
							placeholder="What's in your mind?"
							autosize
							maxRows={1}
						/>
					</Link>
				</Container>
			</Flex>
			{/* <TypographyStylesProvider className={classes.body}>
				<div
					className={classes.content}
					dangerouslySetInnerHTML={{ __html: body }}
				/>
			</TypographyStylesProvider> */}
		</Paper>
	);
};

export default Comment;
