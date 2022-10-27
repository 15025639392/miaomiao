const Controller = require('egg').Controller;

class ArticleController extends Controller {
  get article(){
    return this.service.article
  }
  async update() {
    const { ctx } = this;
    const body = ctx.request.body
    ctx.validate({
        avatar:{
            type:'string'
        }
    })
    const back = await this.article.updateArticle(body)
    // 4.发送响应
    this.ctx.body = back
  }

  async create(){
    const { ctx } = this;
    const body = ctx.request.body
    
    const article = await this.article.createArticle(body)
    // 4.发送响应
    this.ctx.body = {
      ...this.ctx.helper._.pick(article,[
        'content',
        'publishTime',
        '_id',
        'user',
        'imgs',
        'img1',
        'img2',
        'img3'
      ])
    }
    // {
    //   numberId:this.ctx.helper.getNumberId(article._id),
    //   ...article,
    // }
  }

  async getList(){
    
    const res = await this.article.getArticle()
    // 4.发送响应
    this.ctx.body = {
      list:res.list,
      total:res.total
    }
  }

  async delete(){
    const body = this.ctx.request.body
    const item = await this.article.findById(body.id)
    if(item.user !== this.ctx.user.id){
      this.ctx
    }
    const result = await this.article.deleteById(body.id)
    this.ctx.body = result
  }

  async getArticleDetail(){
    const {id} = this.ctx.query
    const result = await this.article.findById(id)
    this.ctx.body = {
      detail:{
        ...this.ctx.helper._.pick(result,[
          'imgs','content'
        ]),
        user:this.ctx.helper._.pick(result.user,[
          '_id','avatar','username'
        ])
      }
    }
  }
}

module.exports = ArticleController;
