import React, { Component } from 'react';
import { gsap } from "gsap";

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.flyIn = this.props.flyIn || '';
        this.element = null;
        this.tween = null;
        this.handlePageLoad = this.handlePageLoad.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handlePageLoad)
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.loaded === false && this.state.loaded) {
            // setTimeout(() => {this.tween.play()}, Math.random() * 2000);
            this.tween.play();
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('load', this.handlePageLoad)
    }

    handlePageLoad() {
        this.setState({
            loaded:true
        })
    }

    onComplete() {
        if(this.props.onComplete) {
            this.props.onComplete();
        }
    }
    
    imageLoaded() {
        let animPropsFrom = {
            opacity: 0,
            rotate:-40
        };
        let animPropsTo = {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            duration: Math.random() * 5 + 3,
            onComplete: this.onComplete
        };
        let searchString = this.flyIn.toLowerCase();
        if (searchString.search('top') !== -1) {
            animPropsFrom.y = -500;
        } else if (searchString.search('bottom') !== -1) {
            animPropsFrom.y = 500;
        }
        if (searchString.search('left') !== -1) {
            animPropsFrom.x = -500;
        } else if (searchString.search('right') !== -1) {
            animPropsFrom.x = 500;
        }
        this.tween = gsap.fromTo(this.myElement, animPropsFrom, animPropsTo);
        this.tween.pause();
    }

    render() {
        let {src, className, alt, style} = this.props;
        style = {...style, opacity: 0};
        let attributes = {
            src, className, alt, style
        }
        return (
            <img ref={img => this.myElement = img} {...attributes} onLoad={() => this.imageLoaded()}></img>
        )
    }
}