const urls = [
  'https://www.youtube.com/watch?v=qxt_8dWBTZI',
  'https://www.youtube.com/watch?v=ocgk_zOtDfo',
  'https://www.youtube.com/watch?v=oofT9jztcp0',
  'https://www.youtube.com/watch?v=uI1jJ0z97TA',
  'https://www.youtube.com/watch?v=R4Er8qh_EkY',
  'https://www.youtube.com/watch?v=f8PK3mRD3Qc',
  'https://www.youtube.com/watch?v=-VqfDapsFLA',
];
(async () => {
  for (const url of urls) {
    const api = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    try {
      const res = await fetch(api);
      const data = await res.json();
      console.log(url);
      console.log(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('ERR', url, err.message);
    }
  }
})();
