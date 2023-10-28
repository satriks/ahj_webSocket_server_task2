const Router = require('koa-router')
const router = new Router()
const { streamEvents} = require('http-event-stream')
const servers = require('../../db/db')


router.get('/sse', async (ctx) => {
    streamEvents(ctx.req, ctx.res , {
        async fetch(lastEventId) {
            console.log(lastEventId);


            return []
        },

        async stream(sse){
            servers.listen((item, event) =>{
                sse.sendEvent({
                    event: event,
                    data : JSON.stringify(item),
                })
            })
            // sse.sendEvent({
            //     event: 'addServer',
            //     data : 'hello from server',
            // })


            return () => {}
        }
    })
    ctx.respond = false
  })



module.exports = router
