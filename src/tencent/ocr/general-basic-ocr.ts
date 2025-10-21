import axios from 'axios';
import { TencentCloudAuth, TencentCloudRequestConfig } from '../../utils/txauth';

interface GeneralBasicOCROptions {
  secretId: string;
  secretKey: string;
  region?: string;
}

interface ImageData {
  image?: string; // Base64 encoded image
  url?: string;   // Image URL
}

interface GeneralBasicOCRResponse {
  Response: {
    TextDetections: Array<{
      DetectedText: string;
      Confidence: number;
      Polygon: Array<{
        X: number;
        Y: number;
      }>;
      AdvancedInfo: string;
    }>;
    Language: string;
    RequestId: string;
  };
}

export class GeneralBasicOCR {
  private authClient: TencentCloudAuth;
  private region: string;

  constructor(options: GeneralBasicOCROptions) {
    this.authClient = new TencentCloudAuth({
      secretId: options.secretId,
      secretKey: options.secretKey
    });
    this.region = options.region || 'ap-beijing';
  }

  async recognize(data: ImageData): Promise<GeneralBasicOCRResponse> {
    const endpoint = 'ocr.tencentcloudapi.com';
    const service = 'ocr';
    const action = 'GeneralBasicOCR';
    const version = '2018-11-19';
    const httpRequestMethod = 'POST';

    // Prepare request parameters
    const params: any = {
      ImageBase64: data.image,
      ImageUrl: data.url,
    };

    // Remove undefined values
    Object.keys(params).forEach(key => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    // Prepare request config for authentication
    const config: TencentCloudRequestConfig = {
      method: httpRequestMethod,
      url: `https://${endpoint}`,
      payload: params,
      service: service,
      action: action,
      version: version,
      region: this.region
    };

    // Generate authentication headers
    const headers = this.authClient.generateAuthorization(config);

    // Add additional headers
    headers['X-TC-RequestClient'] = 'mzapi-sdk-node';

    // Make API request
    const response = await axios.post<GeneralBasicOCRResponse>(`https://${endpoint}`, params, {
      headers: headers,
    });

    return response.data;
  }

