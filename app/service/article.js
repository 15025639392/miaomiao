const Service = require('egg').Service
class ArticleService extends Service{
    get Article(){
        return this.app.model.Article
    }
    
    async createArticle(data){
        data.user = this.ctx.user._id
        const article = new this.Article(data)
        this.Article.populate(article,'user')
        await article.save()
        return article
    }
    async updateArticle(data){
        const {id,...rest} = data
        const article = await this.Article.updateOne({ _id: id },rest)
        this.Article.populate(article,'user')
        return article
    }
    
    async getArticle(){
        let {pageNow=1,pageSize=20} = this.ctx.query
        pageNow = Number.parseInt(pageNow)
        pageSize = Number.parseInt(pageSize)
        let skip = (pageNow-1)*pageSize
        const list = await this.Article.find({},'-__v').populate('user','-_id -__v').skip(skip).limit(pageSize).lean()
        const total = await this.Article.countDocuments()
        return {
            list,
            total
        }
    }

    async deleteById(id){
        const list = await this.Article.findByIdAndDelete(id)
        return list
    }

    async findById(id){
       const detail = await this.Article.findById(id)
       await this.Article.populate(detail,'user')
       return detail
    }
}

module.exports = ArticleService