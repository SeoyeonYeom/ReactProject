import https from 'https';
import axios from 'axios';

const request = axios.create({
  httpsAgent: new https.Agent(),
});

const getUrlObject = async url => {
  const res = await request.get(url);
  return res.data;
};

export const fetchProjectListDemoApi = (page = 1) => {
  return getUrlObject(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${page}.json`);
}