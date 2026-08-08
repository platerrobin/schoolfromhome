import AWS from 'aws-sdk'
import fs from 'fs'

export async function uploadToS3(localPath:string, key:string){
  if (!process.env.AWS_S3_BUCKET) {
    // dev-mode local copy
    const dest = `./public/uploads/${key}`
    await fs.promises.mkdir('./public/uploads', { recursive: true })
    await fs.promises.copyFile(localPath, dest)
    return `/uploads/${key}`
  }

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })
  const data = await s3.upload({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: fs.createReadStream(localPath),
    ACL: 'public-read'
  }).promise()
  return data.Location
}
