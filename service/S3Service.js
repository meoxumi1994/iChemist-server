const AWS = require("aws-sdk");
const md5 = require("md5");

AWS.config.update({
    region: "ap-southeast-1"
});
const s3 = new AWS.S3();

module.exports = {
    generateS3PutObjectSignedUrl: (id, fileName, fileExtension, type) => {
        let key = id + md5(fileName + new Date()) + "." + fileExtension;
        const params = {
            Bucket: "findyday/" + type,
            Key: key,
            ACL: "public-read",
            Expires: 300 // 300 seconds
        };

        const url = s3.getSignedUrl("putObject", params);
        const viewUrl =
            "https://s3-ap-southeast-1.amazonaws.com/findyday/" + type + "/" + key;
        return { urlload: url, urlreal: viewUrl };
    }
};
