import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@lib/apollo-client";
import { gql } from "@apollo/client";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import os from "os";


// Fetch user data
async function fetchUserData(userId: string) {
    const GET_USER = gql`
    query GetUser($getUserId: String) {
      getUser(id: $getUserId) {
        id
        name
        email
        emailVerified
        isUMTMembership
        sex
        age
        image
        coverImage
        facebookLink
        twitterLink
        instagramLink
        githubLink
        dribbbleLink
        youtubeLink
        telegramLink
        tiktokLink
        redditLink
        snapchatLink
        about
        faculty
        major
        year
        cgpa
        created_at
        updated_at
      }
    }
  `;

    const result = await client.query({
        query: GET_USER,
        variables: {
            getUserId: userId,
        },
    });

    return result.data.getUser;
}

// Fetch followers data
async function fetchFollowersData(userId: string) {
    const GET_FOLLOWERS = gql`
    query GetFollowers($userId: String!) {
      getFollowers(userId: $userId) {
        follower {
          id
          name
          image
        }
        created_at
      }
    }
  `;

    const GET_FOLLOWINGS = gql`
    query GetFollowings($userId: String!) {
      getFollowings(userId: $userId) {
        following {
          id
          name
          image
        }
        created_at
      }
    }
  `;

    const followersResult = await client.query({
        query: GET_FOLLOWERS,
        variables: {
            userId: userId,
        },
    });

    const followingsResult = await client.query({
        query: GET_FOLLOWINGS,
        variables: {
            userId: userId,
        },
    });

    return followersResult.data.getFollowers.concat(followingsResult.data.getFollowings);
}

// Fetch threads data
async function fetchThreadsData(userId: string) {
    const GET_THREADS = gql`
    query GetThreadsByAuthor($authorId: String!) {
        getThreadsByAuthor(authorId: $authorId) {
          id
          author {
            id
            name
            image
          }
          title
          description
          images {
            imageUrl
            created_at
            updated_at
          }
          created_at
          updated_at
        }
      }
    `;
    const result = await client.query({
        query: GET_THREADS,
        variables: {
            authorId: userId,
        },
    });

    return result.data.getThreadsByAuthor;
}

// Fetch messages data
async function fetchMessagesData(userId: string) {
    const GET_MESSAGES = gql`
    query GetChannels($userId: String) {
        getChannels(userId: $userId) {
          id
          messages {
            user {
              id
              name
              image
            }
            content
            created_at
            updated_at
          }
        }
      }
    `;

    const result = await client.query({
        query: GET_MESSAGES,
        variables: {
            userId: userId,
        },
    });

    return result.data.getChannels;
}

// Fetch comments data
async function fetchCommentsData(userId: string) {
    const GET_COMMENTS = gql`
    query GetCommentsByUserId($userId: String!) {
        getCommentsByUserId(userId: $userId) {
          user {
            id
            name
            image
          }
          content
          parentId
          created_at
          updated_at
          thread {
            id
            author {
              id
              name
              image
            }
            title
            description
            created_at
            updated_at
          }
        }
      }
    `;

    const result = await client.query({
        query: GET_COMMENTS,
        variables: {
            userId: userId,
        },
    });

    return result.data.getCommentsByUserId;
}

// Fetch votes data
async function fetchVotesData(userId: string) {
    const GET_THREAD_VOTES = gql`
    query GetThreadsVotedByUser($userId: String!) {
        getThreadsVotedByUser(userId: $userId) {
          id
          title
          author{
            id
            name
            image
          }
          created_at
          updated_at
        }
      }
      `;

    const GET_COMMENT_VOTES = gql`
    query GetCommentsVotedByUser($userId: String!) {
        getCommentsVotedByUser(userId: $userId) {
          id
          user {
            id
            name
            image
          }
          content
          created_at
          updated_at
        }
      }
      `;

    const threadVotesResult = await client.query({
        query: GET_THREAD_VOTES,
        variables: {
            userId: userId,
        },
    });

    const commentVotesResult = await client.query({
        query: GET_COMMENT_VOTES,
        variables: {
            userId: userId,
        },
    });

    return threadVotesResult.data.getThreadsVotedByUser.concat(commentVotesResult.data.getCommentsVotedByUser);
}

// Write data to file
function writeToFile(data: any, fileName: string, folderName: string) {
    const tempDir = fs.realpathSync(os.tmpdir());
    const directoryPath = path.join(tempDir, folderName);
    const filePath = path.join(directoryPath, `${fileName}.json`);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFileSync(filePath, JSON.stringify(data));
}


const categories = [
    { name: "account", fetchFn: fetchUserData, fileName: "account.json" },
    { name: "follows", fetchFn: fetchFollowersData, fileName: "follows.json" },
    { name: "threads", fetchFn: fetchThreadsData, fileName: "threads.json" },
    { name: "messages", fetchFn: fetchMessagesData, fileName: "messages.json" },
    { name: "comments", fetchFn: fetchCommentsData, fileName: "comments.json" },
    { name: "votes", fetchFn: fetchVotesData, fileName: "votes.json" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    try {
        const { userId } = req.body;

        const zipFileName = `data-${userId}.zip`;
        const zipFilePath = path.join(process.cwd(), zipFileName);

        // Create a ZIP archive containing all the exported files
        const archive = archiver("zip", { zlib: { level: 9 } });
        const output = fs.createWriteStream(zipFilePath);
        archive.pipe(output);

        const tempDir = fs.realpathSync(os.tmpdir());

        // Fetch and export data for each selected category
        // Fetch and export data for each selected category
        for (const category of categories) {
            if (req.body[category.name]) {
                const data = await category.fetchFn(userId);
                writeToFile(data, category.name, category.name);
                archive.append(fs.createReadStream(path.join(tempDir, category.name, `${category.name}.json`)), {
                    name: `${category.name}/${category.fileName}`
                });
            }
        }



        // Finalize the ZIP archive
        archive.finalize();

        // Wait for the ZIP file to be fully created
        await new Promise((resolve) => {
            output.on("close", resolve);
        });

        // Set the response headers for downloading the ZIP file
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename=${zipFileName}`);

        // Stream the ZIP file as the response
        fs.createReadStream(zipFilePath).pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
