declare namespace Express {
    interface Request {
      file?: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        bucket: string;
        key: string;
        acl: string;
        contentType: string;
        contentDisposition: null | string;
        contentEncoding: null | string;
        storageClass: string;
        serverSideEncryption: null | string;
        metadata: any;
        location: string;
        etag: string;
        buffer: Buffer
      };
    }
  }
  