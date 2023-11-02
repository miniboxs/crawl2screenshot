import xCrawl from 'x-crawl'

// const args = process.argv;

const myXCrawl = xCrawl()

export default async function (params) {

    const { url } = params
    const res = await myXCrawl.crawlPage({
        url,
        maxRetry: 10,
        viewport: { width: 1920, height: 1080 },
        // 为此次的目标统一设置指纹
        fingerprints: [
            // 设备指纹 1
            {
                maxWidth: 1024,
                maxHeight: 800,
                platform: 'Windows',
                mobile: 'random',
                userAgent: {
                    value:
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
                    versions: [
                        {
                            name: 'Chrome',
                            // 浏览器版本
                            maxMajorVersion: 118,
                            minMajorVersion: 112,
                            maxMinorVersion: 20,
                            maxPatchVersion: 5000
                        },
                        {
                            name: 'Safari',
                            maxMajorVersion: 537,
                            minMajorVersion: 500,
                            maxMinorVersion: 36,
                            maxPatchVersion: 5000
                        }
                    ]
                }
            }
        ]
    })

    const { browser, page } = res.data
    // // Get a screenshot of the rendered page
    const buffer = await page.screenshot({ path: `./uploads/${Date.now()}.png` })

    console.log('Screen capture is complete')

    // close brower
    browser.close()

    return buffer
}