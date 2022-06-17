class Post {
    constructor(title, logo) {
        this.title = title;
        this.date = Date();
        this.logo = logo;
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date,
            logo: this.logo,
        })
    }
}

export default Post;