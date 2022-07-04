import React from "react";


export default class ListLinks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            links: [], title: "", url: "", show: true,
            editTitle: "", editUrl: "", editId: "", message: ""
        };
    }
    Sort=()=> {
        let links = this.state.links;
        links.sort((a, b) => a.title.localeCompare(b.title));
        this.setState({ links: links });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const link = { id: Math.random() * 10, title: this.state.title, url: this.state.url };
        this.setState({ links: [...this.state.links, link] });
        this.setState({ title: '' });
        this.setState({ url: '' });
    }
    handleTitle = (e) => {
        this.setState({ title: e });
    }
    handleUrl = (e) => {
        let regex = /^(http|https):\/\/[^ "]+$/;
        if (regex.test(e)) {
            this.setState({ url: e });
            this.setState({ message: "" });
        }
        else
        {
            this.setState({ message: "Invalid URL" });
        }
    }

    handleEditTitle = (e) => {
        this.setState({ editTitle: e });
    }
    handleEditUrl = (e) => {
        this.setState({ editUrl: e });
    }
    handleRemove = (e) => {
        const links = this.state.links.filter(link => link.id !== e);
        this.setState({ links: links });
    }
    handleEdit = (e) => {
        this.setState({ show: false });
        this.setState({ editId: e });
    }
    handleChanges = (e) => {
        e.preventDefault();
        const link = this.state.links.find(link => link.id === this.state.editId);
        link.title = this.state.editTitle;
        link.url = this.state.editUrl;
        this.setState({ links: this.state.links });
        this.setState({ show: true });
        this.setState({ editTitle: '' });
        this.setState({ editUrl: '' });
    }


    render() {
        return (
            <>
                <div>

                    <ul>
                        <button onClick={this.Sort}>Sort</button>
                        {this.state.links.map(link => (
                            <li key={link.id}>
                                <a href={link.url}>{link.title}</a>
                                <button onClick={e => this.handleRemove(link.id)}>Remove</button>
                                <button onClick={e => this.handleEdit(link.id)}>Edit</button>
                            </li>
                        ))}
                        <form hidden={this.state.show} onSubmit={this.handleChanges}>
                            <input type="text" value={this.state.editTitle} onChange={e => this.handleEditTitle(e.target.value)} />
                            <input type="text" value={this.state.editUrl} onChange={e => this.handleEditUrl(e.target.value)} />
                            <button type="submit">ok</button>
                        </form>
                    </ul>

                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.state.title} onChange={e => this.handleTitle(e.target.value)} type="text" placeholder="title" />
                        <p></p>
                        <input value={this.state.url} onChange={e => this.handleUrl(e.target.value)} type="text" placeholder="url" />
                        <span style={{ color: 'red' }}>{this.state.message}</span>
                        <p></p>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </>
        );
    }
}