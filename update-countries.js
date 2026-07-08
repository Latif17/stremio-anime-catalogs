const needle = require('needle');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'anilist-countries.json');

async function fetchCountries() {
    let page = 1;
    let hasNextPage = true;
    let countriesMap = {};

    try {
        if (fs.existsSync(dbPath)) {
            countriesMap = JSON.parse(fs.readFileSync(dbPath));
        }
    } catch (e) {
        countriesMap = {};
    }

    console.log('Fetching Anilist countries...');
    
    const query = `
    query ($page: Int) {
        Page(page: $page, perPage: 50) {
            pageInfo { hasNextPage }
            media(type: ANIME, sort: ID) { id countryOfOrigin }
        }
    }`;

    while (hasNextPage) {
        try {
            const response = await needle('post', 'https://graphql.anilist.co', {
                query: query,
                variables: { page: page }
            }, { json: true });

            if (response.statusCode === 429) {
                const retryAfter = response.headers['retry-after'] || 60;
                console.log(`Rate limited. Waiting for ${retryAfter} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                continue; // Retry the same page
            }

            if (response.body && response.body.data && response.body.data.Page && response.body.data.Page.media) {
                const media = response.body.data.Page.media;
                media.forEach(m => {
                    if (m.countryOfOrigin) {
                        countriesMap[m.id] = m.countryOfOrigin;
                    }
                });
                hasNextPage = response.body.data.Page.pageInfo.hasNextPage;
                page++;
                
                // Sleep for 700ms to stay under the 90 req/min limit
                await new Promise(resolve => setTimeout(resolve, 700));
            } else {
                console.error(`Unexpected response structure on page ${page}`, response.body);
                hasNextPage = false;
            }
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error.message);
            hasNextPage = false; // Stop on error, or could retry
        }
    }

    fs.writeFileSync(dbPath, JSON.stringify(countriesMap, null, 2));
    console.log('Finished updating Anilist countries.');
    return countriesMap;
}

if (require.main === module) {
    fetchCountries();
}

module.exports = { fetchCountries };
