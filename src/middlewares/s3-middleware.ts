import {S3} from '@aws-sdk/client-s3'
import {Upload} from '@aws-sdk/lib-storage'

export const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})


export const listBuckets = async () => {
    const data = await s3.
    listBuckets().then((res) => res.Buckets).
    catch((err) => console.error(err.Code, err.Message))
    console.log(data)
}

export const CreateBucket = async (bucketName: string) => {
    const data = await s3.
    createBucket({Bucket: bucketName}).
    then((res) => console.log(res)).
    catch((err) => console.error(err.Code, err.Message))
}

export const DeleteBucket = async (bucketName: string) => {
    const data = await s3.
    deleteBucket({Bucket: bucketName}).
    then((res) => console.log(res)).
    catch((err) => console.error(err.Code, err.Message))
}
export const uploadFile = async (bucketName: string, fileKey: string, file: Buffer) => {
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: bucketName,
            Key: fileKey,
            Body: file,
            ContentType: 'audio/mpeg'
        }
    });

    try {
        const result = await upload.done();
        console.log('File uploaded successfully:', result.Key);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}


export const PutObject = async (bucketName: string, fileKey: string, file: Buffer) => {
    const data = await s3.
    putObject({Bucket: bucketName, Key: fileKey, Body: file}).
    then((res) => console.log(res)).
    catch((err) => console.error({"error":err.Code}))
}

export const DeleteObject = async (bucketName: string, fileKey: string) => {
    const data = await s3.
    deleteObject({Bucket: bucketName, Key: fileKey}).
    then((res) => console.log(res)).
    catch((err) => console.error(err.Code, err.Message))
}


