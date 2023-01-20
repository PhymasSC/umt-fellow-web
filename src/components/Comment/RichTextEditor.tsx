import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useRef } from "react";
import { IconVideo } from "@tabler/icons";
import { Button, Popover, TextInput } from "@mantine/core";
import Youtube from "@tiptap/extension-youtube";
import { lowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { UseFormReturnType } from "@mantine/form";

lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("java", java);

interface RTEProps {
	form: UseFormReturnType<{
		title: string;
		tags: never[];
		description: string;
		images: never[];
	}>;
}

const RTE: React.FC<RTEProps> = ({ form }) => {
	const youtubeUrlRef = useRef<HTMLInputElement>(null);
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Youtube,
			CodeBlockLowlight.configure({
				lowlight,
			}),
		],
		content: "",
		onUpdate: ({ editor }) => {
			form.setFieldValue("description", editor.getHTML());
		},
	});

	const addVideo = () => {
		console.log(youtubeUrlRef.current?.value);
		editor?.commands.setYoutubeVideo({
			src: youtubeUrlRef.current?.value || "",
			width: 640,
			height: 480,
		});
	};
	return (
		<RichTextEditor
			editor={editor}
			sx={(theme) => ({
				"& .ProseMirror": {
					minHeight: 200,
					maxHeight: 300,
					overflowY: "auto",
					overflowX: "hidden",
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.white,
					padding: "1em",
				},
			})}
		>
			<RichTextEditor.Toolbar sticky stickyOffset={60}>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold />
					<RichTextEditor.Italic />
					<RichTextEditor.Underline />
					<RichTextEditor.Strikethrough />
					<RichTextEditor.ClearFormatting />
					<RichTextEditor.Highlight />
					<RichTextEditor.Code />
					<RichTextEditor.CodeBlock />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.H1 />
					<RichTextEditor.H2 />
					<RichTextEditor.H3 />
					<RichTextEditor.H4 />
					<RichTextEditor.H5 />
					<RichTextEditor.H6 />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Blockquote />
					<RichTextEditor.Hr />
					<RichTextEditor.BulletList />
					<RichTextEditor.OrderedList />
					<RichTextEditor.Subscript />
					<RichTextEditor.Superscript />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Link />
					<RichTextEditor.Unlink />
				</RichTextEditor.ControlsGroup>

				<RichTextEditor.ControlsGroup>
					<RichTextEditor.AlignLeft />
					<RichTextEditor.AlignCenter />
					<RichTextEditor.AlignJustify />
					<RichTextEditor.AlignRight />
				</RichTextEditor.ControlsGroup>

				<Popover
					trapFocus
					shadow="md"
					withinPortal
					offset={-44}
					zIndex={10000}
				>
					<Popover.Target>
						<RichTextEditor.Control
							aria-label="Insert youtube url"
							title="Insert youtube url"
						>
							<IconVideo stroke={1.5} size={16} />
						</RichTextEditor.Control>
					</Popover.Target>
					<Popover.Dropdown
						sx={(theme) => ({
							padding: theme.spacing.sm,
							paddingRight: theme.spacing.xl,
							backgroundColor:
								theme.colorScheme === "dark"
									? theme.colors.dark[7]
									: theme.white,
						})}
					>
						<TextInput
							w={280}
							placeholder="https://example.com/"
							type="url"
							ref={youtubeUrlRef}
							rightSection={
								<Button
									variant="default"
									sx={{
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
									}}
									onClick={addVideo}
								>
									Save
								</Button>
							}
						/>
					</Popover.Dropdown>
				</Popover>
			</RichTextEditor.Toolbar>

			<RichTextEditor.Content />
		</RichTextEditor>
	);
};

export default RTE;
