export default function driveUrlConverter(url:string) {
   // Regular expression to match Google Drive file ID in the URL
   const regex = /id=([^&]+)/;
   const match = RegExp(regex).exec(url);

   if (match) {
      const fileId = match[1];
      const directLink = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      return directLink;
   } else {
      // If the regular expression doesn't match, handle it accordingly
      console.error("Unable to extract Google Drive file ID from the URL.");
      return null;
   }
}
