// 使用示例：腾讯云通用印刷体OCR (GeneralBasicOCR)
const { GeneralBasicOCR } = require('mzapi-ts-sdk');

async function example() {
  // 初始化OCR客户端
  const ocrClient = new GeneralBasicOCR({
    secretId: 'AKIDb*******************************',     // 替换为你的腾讯云SecretId
    secretKey: 'MWTJy***************************',   // 替换为你的腾讯云SecretKey
  });

  try {
    // 方式1: 使用Base64编码的图片
    // const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...'; // 替换为实际的Base64图片数据
    // const result1 = await ocrClient.recognize({
    //   image: base64Image
    // });
    
    // console.log('Base64图片OCR结果:');
    // console.log(JSON.stringify(result1, null, 2));
    
    // // 打印RequestId
    // if (result1.Response && result1.Response.RequestId) {
    //   console.log(`RequestId: ${result1.Response.RequestId}`);
    // }
    
    // // 输出识别到的文本
    // if (result1.Response.TextDetections) {
    //   result1.Response.TextDetections.forEach((textItem: any, index: number) => {
    //     console.log(`第${index + 1}段文本: ${textItem.DetectedText}`);
    //   });
    // }

    // 方式2: 使用图片URL
    const imageUrl = 'https://ocr-demo-1254418846.cos.ap-guangzhou.myqcloud.com/general/GeneralBasicOCR/GeneralBasicOCR1.jpg'; // 替换为实际的图片URL
    const result2 = await ocrClient.recognize({
      url: imageUrl
    });
    
    console.log('图片URL OCR结果:');
    console.log(JSON.stringify(result2, null, 2));
    
    // 打印RequestId
    if (result2.Response && result2.Response.RequestId) {
      console.log(`RequestId: ${result2.Response.RequestId}`);
    }
    
    // 输出识别到的文本
    if (result2.Response.TextDetections) {
      result2.Response.TextDetections.forEach((textItem: any, index: number) => {
        console.log(`第${index + 1}段文本: ${textItem.DetectedText}`);
      });
    }
  } catch (error) {
    console.error('OCR识别失败:', error);
  }
}

// 运行示例
example();
