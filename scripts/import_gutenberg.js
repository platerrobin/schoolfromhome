/* Helper script to import public-domain texts from Project Gutenberg when you want to host them locally.
   Usage: node scripts/import_gutenberg.js <gutenberg-ebook-id> <target-filename>

   Note: This script is optional. For staged delivery we currently link to Gutenberg rather than hosting files.
*/

const https = require('https')
const fs = require('fs')

async function fetchText(id, filename){
  const url = `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode !== 200) return reject(new Error('Failed to fetch'))
      const file = fs.createWriteStream(`./public/books/${filename}`)
      res.pipe(file)
      file.on('finish', ()=> file.close(resolve))
    }).on('error', reject)
  })
}

if (require.main === module){
  const id = process.argv[2]
  const filename = process.argv[3] || `${id}.txt`
  if (!id){ console.error('Usage: node import_gutenberg.js <id> <filename>'); process.exit(1) }
  fs.mkdirSync('./public/books', { recursive: true })
  fetchText(id, filename).then(()=> console.log('Done')).catch(e=> console.error(e))
}
