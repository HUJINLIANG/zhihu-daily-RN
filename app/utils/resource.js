/**
 * Created by jialao on 2016/10/9.
 */
function getList(){
    return fetch('http://news-at.zhihu.com/api/4/news/latest');
}

function getHistoryStory(date){
    return fetch('http://news.at.zhihu.com/api/4/news/before/' + date);
}

function getDetail(id){
    return fetch('http://news-at.zhihu.com/api/4/news/' + id);
}

function getThemeList(){
    return fetch('http://news-at.zhihu.com/api/4/themes')
}

function getTheme(id){
    return fetch('http://news-at.zhihu.com/api/4/theme/' + id)
}

function getHot(){
    return fetch('http://news-at.zhihu.com/api/3/news/hot')
}

export default {
    getList,
    getHistoryStory,
    getDetail,
    getThemeList,
    getTheme,
    getHot
}
