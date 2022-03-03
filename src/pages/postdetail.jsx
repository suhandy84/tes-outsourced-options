import React, { Component } from "react";
import Axios from 'axios'

class Detail extends Component {
    state = {
        title: "",
        image: "",
        content: "",
        comment: [],
        author: ""
    }

    componentDidMount() {
        console.log()
        Axios.get(`https://jsonplaceholder.typicode.com/photos/${this.props.match.params.name}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    title: res.data.title,
                    image: res.data.url,

                })
            }).catch((err) => {
                console.log(err)
            })
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.name}`)
            .then((res1) => {
                console.log(res1.data)

                this.setState({
                    content: res1.data.body,
                    author: res1.data.userId
                })
            }).catch((err1) => {
                console.log(err1)
            })
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.name}/comments`)
            .then((res2) => {
                console.log(res2.data)

                this.setState({
                    comment: res2.data,
                })
                console.log(this.state.comment)
            }).catch((err2) => {
                console.log(err2)
            })
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderComments = () => {
        console.log(this.state.comment)
        return this.state.comment.map((val, index) => {
            return (
                <div key={index}>
                    <h5>{index + 1 + '. '} {this.capitalizeFirstLetter(val.body)}</h5>
                </div>
            )
        })
    }
    render() {
        const { title, image, content, author } = this.state
        return (
            <div className="detail mt-5 mb-5">
                <div className="title-detail mt-3 mb-5">
                    <h1>
                        Detail
                    </h1>

                </div>
                <div className="stats-detail">
                    <img src={image} />
                    <h1>{title.toUpperCase()}</h1>
                    <h4> Content: </h4>
                    <h3> {this.capitalizeFirstLetter(content)}</h3>
                    <h4> Comment: </h4>
                    {this.renderComments()}
                    <h3>Author: </h3>
                    <h5>{author}</h5>
                </div>


            </div>
        );
    }
}

export default Detail;