import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsS3Service {
    public accessKeyId: string
    public secretAccessKey: string
    constructor(
        private readonly configService: ConfigService,) {
        this.accessKeyId = this.configService.get<string>("AWS_ACCESS_KEY_ID")
        this.secretAccessKey = this.configService.get<string>("AWS_SECRET_ACCESS_KEY")
    }

    async uploadFile(dataBuffer: Buffer, fileName: string) {
        const s3 = new S3Client({
            region: this.configService.get<string>("AWS_REGION"),
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey
            }
        });

        const fileKeyName = uuidv4() + ".png"

        const uploadResult = new PutObjectCommand({
            Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
            Body: dataBuffer,
            Key: fileKeyName
        })

        await s3.send(uploadResult);

        const fileStorageInDB = ({
            key: uploadResult.input.Key,
            url: "https://my-social-media-project.s3.eu-central-1.amazonaws.com/" + fileKeyName
        });

        return fileStorageInDB;
    }
}
