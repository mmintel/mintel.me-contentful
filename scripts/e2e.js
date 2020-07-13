const path = require('path');
const contentful = require('contentful');
const fs = require('fs');

(async () => {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

  const client = contentful.createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  })

  try {
    const pages = await client.getEntries({
      content_type: 'page',
      include: 0
    })
    fs.writeFileSync(path.resolve(process.cwd(), './cypress/fixtures/pages.json'), JSON.stringify(pages))
  } catch(e) {
    console.log(e);
  }
})()