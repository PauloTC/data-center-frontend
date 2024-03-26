import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIARUO3BI5AIKALEON6",
  secretAccessKey: "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",
  region: "sa-east-1", // ej. 'us-east-1'
});

const s3 = new AWS.S3();

// Función para subir un archivo a S3
export async function uploadToS3(file) {
  const params = {
    Bucket: "data-center-strapi",
    Key: file.name, // Nombre del archivo en tu bucket S3
    Body: file,
    ACL: "public-read", // Si quieres que el archivo sea público
    ContentType: file.type, // Tipo de archivo que estás subiendo
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`Archivo subido exitosamente en ${data.Location}`);
    return data.Location;
  } catch (error) {
    console.log("Error al subir el archivo:", error);
    throw error;
  }
}
