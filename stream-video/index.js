const { createReadStream, stat } = require('fs');
const { createServer } = require('http');
const { promisify } = require('util');
const fileInfo = promisify(stat);

const path = '/home/tamvv/Videos/HawaiiMusic.mp4';

const maxChunk = 1024 * 1024;

createServer(async (req, res) => {
  const { size } = await fileInfo(path);

  let start = 0;
  let end = size - 1;

  if (req.headers.range) {
    const rangeItems = req.headers.range.replace('bytes=', '').split('-');
    
    start = parseInt(rangeItems[0]);
    end = rangeItems[1] ? Number(rangeItems[1]) : size - 1;
  }

  const chunkSize = end - start + 1;

  if (chunkSize > maxChunk) {
    end = start + maxChunk - 1;
  }

  console.log(`start; ${start}, end: ${end}`);

  res.writeHead(206, {
    'Content-Length': (end - start) + 1,
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Content-Range': `bytes ${start}-${end}/${size}`,
  });

  createReadStream(path, { start, end }).pipe(res);
}).listen(3000, () => {
  console.log('App started...');
});
