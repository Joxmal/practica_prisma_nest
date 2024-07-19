import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';

@Injectable()
export class FileService {
  async deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      unlink(filePath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
