import {Downloader} from "nodejs-file-downloader";
import fs from 'fs';
import path from "path"

async function download(url: any, directory: any) {
  //Wrapping the code with an async function, just for the sake of example.

  const downloader = new Downloader({
    url, //If the file name already exists, a new file with the name 200MB1.zip is created.
    directory, //This folder will be created, if it doesn't exist.   
  });
  try {
    const {filePath,downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.

    console.log("All done", filePath, downloadStatus);
    return {filePath, downloadStatus};
  } catch (error) {
    //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
    //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
    console.log("Download failed", error);
  }
  return false;
}

const avatarPath = path.join(__dirname, "..", path.sep, "..", path.sep, "..", path.sep, "surfers", "..", "assets", "..", "avatars");
export async function downloadAvatar(bot: any, chatId: number, userName: string): Promise<string> {
    try {
        let profilePhotos = await bot.getUserProfilePhotos(chatId);
        if (profilePhotos && profilePhotos.total_count > 0) {
            const fileId = profilePhotos.photos[0]![0]?.file_id as string;
            console.log(`file id: ${fileId}`);
            let photoUrl = await bot.telegram.getFileLink(fileId);
            if (photoUrl) {
                console.log(`photo url: ${photoUrl}`);
                download(photoUrl, avatarPath).then((res) => {
                    fs.renameSync((res as any).filePath, `${avatarPath}/${userName}`);
                });
                return Promise.resolve(photoUrl);
            }
        } else {
            console.log(`No photo for ${userName}`);
        }
    } catch (e) {
        console.log(e);
    }
    return Promise.resolve('');
}
