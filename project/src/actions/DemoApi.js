import axios from 'axios';

const request = axios.create();

const getUrlObject = async url => {
  const res = await request.get(url);
  return res.data;
};

// 주어진 json url 주소에 있는 값을 읽어온다.
export const fetchProjectListDemoApi = (page = 1) => {
  return getUrlObject(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${page}.json`);
}