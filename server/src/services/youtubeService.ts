import 'dotenv/config';
import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';

const getOAuthClient = (tokens: Credentials) => {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH_REDIRECT_URI
  );
  oauth2.setCredentials(tokens);
  return oauth2;
};

export const getVideoDetails = async (videoId: any, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });
  const res = await youtube.videos.list({
    part: ['snippet', 'statistics'],
    id: videoId
  });
  return res?.data?.items?.[0];
};

export const updateMetadata = async (videoId: any, { title, description }: any, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });
//   const snippet = { title, description, categoryId: '22' };
  await youtube.videos.update({
    part: ['snippet'],
    requestBody: {
      id: videoId,
      snippet: { title, description, categoryId: '22' }
    }
  });
}

export const getComments = async (videoId: string, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });

  const res = await youtube.commentThreads.list({
    part: ['snippet'],
    videoId,
    maxResults: 50,
    order: 'time',
  });

  return res.data;
};

export const comment = async (videoId: any, text: any, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });
  const res = await youtube.commentThreads.insert({
    part: ['snippet'],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: { snippet: { textOriginal: text } }
      }
    }
  });
  return res.data;
}

export const reply = async (commentId: any, text: any, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });
  const res = await youtube.comments.insert({
    part: ['snippet'],
    requestBody: {
      snippet: { parentId: commentId, textOriginal: text }
    }
  });
  return res.data;
}

export const deleteComment = async (commentId: any, tokens: any) => {
  const youtube = google.youtube({ version: 'v3', auth: getOAuthClient(tokens) });
  await youtube.comments.delete({ id: commentId });
}
