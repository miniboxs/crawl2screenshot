import xCrawl from 'x-crawl'

const args = process.argv;

const myXCrawl = xCrawl()

async function Test() {
    const res = await myXCrawl.crawlPage({
        targets: [
            args[2]
        ],
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

    // 通过遍历爬取页面结果获取图片 URL
    const imgUrls = []
    for (const item of res) {
        const { id } = item
        const { page } = item.data
        const elSelector = id === 1 ? '.sd_list__32LAL' : '.c4mnd7m' //sd_list__32LAL

        // 等待页面元素出现
        await page.waitForSelector(elSelector)

        //获取页面图片的 URL
        const urls = await page.$$eval(`${elSelector} img`, (imgEls) => imgEls.map((item) => item.src))

        imgUrls.push(...urls)

        // 关闭页面
        page.close()
    }

    // 调用 crawlFile API 爬取图片
    await myXCrawl.crawlFile({ targets: imgUrls, storeDirs: './upload' })
}
Test()