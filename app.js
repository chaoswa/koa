var koa=require ('koa');
var router=require('koa-router')(); //引用和实例化路由

var app=new koa();


//应用级中间件
app.use(async(ctx,next)=>{
    console.log(new Date());
 
    await next();

    if(ctx.status==404){
        ctx.status=404;
        ctx.body="这是一个404页面";
    }else{
        console.log(ctx.url)
    }
})


//路由级中间件
router.get('/news',async(ctx,next)=>{
    console.log('这是新闻')

    await next();
})




//ctx 上下文context，包含了req，res
router.get('/',async (ctx)=> {
    ctx.body="首页" //返回数据，相当于res.writeHead(),res.end()

})

//获取get传值
router.get('/news',async(ctx)=>{

    //从ctx中获取
    console.log(ctx.query) //对象
    console.log(ctx.querystring) //字符串
    console.log(ctx.url) //地址

    console.log(ctx.request)

    ctx.body="新闻路由"
})

//动态路由
router.get('/user/:aid',async(ctx)=>{

    //获取动态路由的传值
    console.log(ctx.params)

    ctx.body="用户"
})





app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)