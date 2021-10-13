'use strict';
import _ from 'lodash';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

module.exports = {
  init(config) {
    const S3 = new S3Client({
      ...config,
    });

    return {
      upload(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket

          const path = file.path ? `${file.path}/` : '';

          const uploadParams = {
            Bucket: config.bucket, // bucket name
            Key: `${path}${file.hash}${file.ext}`,
            ACL: 'public-read', // 'private' | 'public-read'
            Body: Buffer.from(file.buffer, 'binary'),
          };


          try {
            const data = await S3.send(new PutObjectCommand(uploadParams));
            file.url = data.Location;
            console.log('Success', data);
            resolve();
          } catch (err) {
            console.log('Error', err);
            reject();
          }

        });
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          try {
            const data = await s3.send(
              new DeleteObjectCommand({
                Bucket: config.bucket,
                Key: `${path}${file.hash}${file.ext}`,
                VersionId: 'version2.2',
              })
            );
            console.log('Success', data);
            resolve();
          } catch (err) {
            console.log('Error', err);
            reject();
          }
        });
      },
    };
  },
};
