import Fastify from 'fastify'
import crawl from './crawl.mjs'


const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.post('/api/screenshoot', async function handler(request, reply) {
    const { url } = request.body
    const buffer = await crawl({ url })
    
    // 在发送非常规数据时。一定一定要指定响应数据类型
    reply.type("image/jpeg")
    return buffer
})

// Run the server!
try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}