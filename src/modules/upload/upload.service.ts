import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';
import { accessKey, bucket, secretKey } from 'src/config';

@Injectable()
export class UploadService {
  private readonly accessKey = accessKey;
  private readonly secretKey = secretKey;
  private readonly bucket = bucket;

  private readonly mac = new qiniu.auth.digest.Mac(
    this.accessKey,
    this.secretKey,
  );
  private readonly config = new qiniu.conf.Config();

  private readonly bucketManager = new qiniu.rs.BucketManager(
    this.mac,
    this.config,
  );

  async uploadFile(localFilePath: string, key: string): Promise<string> {
    const uploadToken = this.generateUploadToken();
    const formUploader = new qiniu.form_up.FormUploader(this.config);

    return new Promise<string>((resolve, reject) => {
      formUploader.putFile(
        uploadToken,
        key,
        localFilePath,
        null,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }

          if (respInfo.statusCode === 200) {
            resolve(respBody.key);
          } else {
            reject(respBody);
          }
        },
      );
    });
  }

  private generateUploadToken(): string {
    const putPolicy = new qiniu.rs.PutPolicy({ scope: this.bucket });
    return putPolicy.uploadToken(this.mac);
  }
}
