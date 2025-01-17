'use client';

import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.studifit',
    projectID: '67696b1600121bd80260',
    databaseID : '67696c93003559c4bdee',
    userCollectionID : '67696cb3001543343ec7',
    videoCollectionID : '67696ce100224c4897fd',
    storageID : '67696e27001d45c7328c'
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectID) 
    .setPlatform(appwriteConfig.platform) 
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.userCollectionID,
      ID.unique(),
      {
        accountID: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log('session created',session);
    return session;
  } catch (error) {
    console.error('Error signing in:', error); // Debugging
    throw new Error(error.message || 'Failed to sign in');
  }
}

export async function getAccount() {
  try {
      const currentAccount = await account.get();
      return currentAccount;
  } catch (error) {
      console.error('Error fetching account:', error); // Debugging
      throw new Error('No active session. Please sign in.');
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;
  
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.userCollectionID,
      [Query.equal("accountID", currentAccount.$id)]
    );
  
    if (!currentUser) throw Error;
  
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionID,
            [Query.orderDesc('$createdAt')]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionID,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionID,
            [Query.search('title', query)]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionID,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    }
    catch(error){
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    try {
      if (type === 'video') {
        return await storage.getFileView(appwriteConfig.storageID, fileId); 
      } else if (type === 'image') {
        return await storage.getFilePreview( 
          appwriteConfig.storageID,
          fileId,
          2000,
          2000,
          'top',
          100
        );
      } else {
        throw new Error('Invalid file type');
      }
    } catch (error) {
      console.error("Error in getFilePreview:", error); 
      throw new Error(error); 
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;
  
    const asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
      uri: file.uri,
    };
  
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageID,
        ID.unique(),
        asset
      );
  
      console.log("File uploaded:", uploadedFile); // Cek file yang diupload
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      console.log("File URL:", fileUrl); // Cek URL file
  
      return fileUrl;
    } catch (error) {
      console.error("Error in uploadFile:", error); // Log error
      throw new Error(error);
    }
};

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const  newPost = await databases.createDocument(
            appwriteConfig.databaseID, 
            appwriteConfig.videoCollectionID, 
            ID.unique(), 
            {
                title: form.title,
                thumbnail : thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        )
        return newPost;
        
    } catch (error) {
        console.error('Error creating video:', error.message || error);
    }
}